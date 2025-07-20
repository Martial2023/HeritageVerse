'use server'
import { prisma } from "@/lib/prisma";
import { SearchResult, Story } from "@/lib/types";


export async function fetchSearchResults({
    query,
    page,
    pageSize
}: {
    query: string;
    page: number;
    pageSize: number;
}): Promise<SearchResult[]> {
    console.log('Query: ', query, page, pageSize)
    const results = await prisma.story.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    region: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    summary: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    author: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    authorEmail: {
                        contains: query,
                        mode: 'insensitive'
                    }
                }
            ]
        },
        orderBy: {
            updatedAt: 'desc'
        }
    });

    return results;
}


export async function fetchStoryById(id: string): Promise<Story | undefined> {
    try {
        if(!id) {
            throw new Error("ID is required to fetch a story");
        }
        const story = await prisma.story.findUnique({
            where: { id },
            include: {
                subStories: true
            }
        });
        if (!story) {
            throw new Error("Story not found");
        }
        return {
            ...story,
            imageUrl: story.imageUrl ?? undefined,
            subStories: story.subStories.map(subStory => ({
                ...subStory,
                imageUrl: subStory.imageUrl ?? undefined
            }))
        }
    } catch (error) {
        console.log("Erreur lors de la récupération de l'histoire", error)
    }
}
export async function saveHistoryToDb(history: {
    authorName: string;
    authorEmail: string;
    title: string;
    summary: string;
    sections: {
        title: string;
        content: string;
        image?: string | null;
    }[];
    region: string;
}): Promise<void> {
    try {
        console.log("ImagesUrls:", history.sections.map(section => section.image));
        await prisma.story.create({
            data: {
                author: history.authorName,
                authorEmail: history.authorEmail,
                title: history.title,
                summary: history.summary,
                content: history.sections.map(section => section.content).join("\n"), // Combine section contents
                imageUrl: history.sections[0]?.image ?? null, // Use the first section's image if available
                region: history.region,
                subStories: {
                    create: history.sections.map(section => ({
                        title: section.title,
                        content: section.content,
                        imageUrl: section.image ?? null
                    }))
                }
            }
        });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'histoire :", error);
        throw error;
    }
}


export async function getHistoryById(id: string): Promise<Story | null> {
    try {
        const story = await prisma.story.findUnique({
            where: { id },
            include: {
                subStories: true
            }
        });
        if (!story) {
            return null;
        }
        return {
            ...story,
            imageUrl: story.imageUrl ?? undefined,
            subStories: story.subStories.map(subStory => ({
                ...subStory,
                imageUrl: subStory.imageUrl ?? undefined
            }))
        };
    } catch (error) {
        console.error("Erreur lors de la récupération de l'histoire :", error);
        return null;
    }
}