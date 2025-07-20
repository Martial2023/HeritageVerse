'use server'
import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from 'node:fs';
import { GeminiHistorySplit } from "./types";
import { buffer } from "node:stream/consumers";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const summarizeAndSplitStory = async (storyText: string): Promise<GeminiHistorySplit> => {
    const prompt = `
                    Tu es un expert de la structuration narrative. Reçois ce conte africain, et produis :
                    1. Un titre accrocheur
                    2. Un résumé clair en 2 à 3 phrases
                    3. Une découpe de l’histoire en **au plus 5 sections** logiques sans changer le texte si ne serait-ce que les erreurs ou ponctuations avec pour chaque section :
                    - un titre court
                    - le contenu (reformulé légèrement si besoin pour être clair)

                    Retourne les résultats au format JSON :

                    {
                    title: "...",
                    summary: "...",
                    sections: [
                        { title: "...", content: "..." },
                        ...
                    ]
                    }

                    Voici l’histoire à traiter :
                    """${storyText}"""
`;

    const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    })
    let text = response.text ?? ""

    text = text.trim()
    if (text.startsWith('```json')) {
        text = text.replace(/^```json/, '').replace(/```$/, '').trim()
    }

    try {
        const parsed = JSON.parse(text)

        // Générer les images pour chaque section en parallèle
        const sectionsWithImages = await Promise.all(
            parsed.sections.map(async (section: { title: string; content: string }) => {
                try {
                    const imageResult = await generateSectionImage(section.content, section.title);
                    return {
                        ...section,
                        image: imageResult.fileData
                    };
                } catch (error) {
                    console.error(`Erreur lors de la génération d'image pour la section "${section.title}":`, error);
                    // Retourner la section sans image en cas d'erreur
                    return section;
                }
            })
        );

        return {
            ...parsed,
            sections: sectionsWithImages
        };
    } catch (err) {
        console.error('Erreur de parsing Gemini :', err)
        throw new Error('Réponse non JSON : ' + text)
    }
}


export const generateSectionImage = async (section: string, title: string): Promise<{ fileName: string; fileData: string }> => {
    try {
        const fileName = `${title}_${Date.now()}.png`;
        const contents = `
        Génère une image haute qualité et en couleur pour illustrer la section suivante d’un conte africain.

        L’image doit être une illustration fidèle de la scène décrite, sans aucun texte ou avec au maximum 3 mots. Ne place pas de légende ou de titres.

        Section : ${section}
        `;

        const response = await genAI.models.generateContent({
            model: "gemini-2.0-flash-preview-image-generation",
            contents: contents,
            config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE],
            },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.text) {
                console.log("part.text");
            } else if (part.inlineData) {
                const imageData = part.inlineData.data;
                if (imageData) {
                    const buffer = Buffer.from(imageData, "base64");
                    return { fileName, fileData: buffer.toString('base64') }; // Convert Buffer to base64 string
                } else {
                    console.error("Image data is undefined.");
                    throw new Error("Failed to generate image: image data is undefined.");
                }
            }
        }
        throw new Error("No valid image data found in response.");
    } catch (error) {
        console.error('Erreur lors de la génération de l’image de section :', error);
        throw new Error('Échec de la génération de l’image pour la section : ' + section);
    }
};


// export const GeminiTranslateToWolof = async (text: string): Promise<string> => {
//     try {
//         return text
//     } catch (error) {
//         console.error('Erreur lors de la traduction en Wolof :', error);
//         throw new Error('Échec de la traduction en Wolof pour le texte : ' + text);

//     }
// }

export const GeminiTranslateToWolof = async (text: string): Promise<string> => {
    try {
        const prompt = `
Tu es un expert linguiste maîtrisant parfaitement le wolof. Traduis le texte suivant en wolof.
Garde un style naturel et fluide, adapté à un conte africain.

Texte à traduire :
"""${text}"""
`;

        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        let translatedText = response.text ?? "";

        // Nettoyage si Gemini encadre la réponse
        translatedText = translatedText.trim();
        if (translatedText.startsWith("```") && translatedText.endsWith("```")) {
            translatedText = translatedText.replace(/^```[a-z]*\n?/i, "").replace(/```$/, "").trim();
        }

        return translatedText;
    } catch (error) {
        console.error("Erreur lors de la traduction en Wolof :", error);
        throw new Error("Échec de la traduction en Wolof pour le texte : " + text);
    }
};