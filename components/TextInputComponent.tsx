'use client'
import { Loader, Handshake } from 'lucide-react'
import React from 'react'
import { Credenza, CredenzaTrigger, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaBody, CredenzaFooter, CredenzaClose } from './CredenzaModal'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

type Props = {
    children: React.ReactNode,
    setHistoryText: React.Dispatch<React.SetStateAction<string>>,
    isCreating: boolean,
    handleHistoryCreating: () => void
}
const TextInputComponent = ({ children, setHistoryText, isCreating, handleHistoryCreating }: Props) => {
    const [text, setText] = React.useState<string>('')
    return (
        <Credenza>
            <CredenzaTrigger asChild>
                {children}
            </CredenzaTrigger>
            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle asChild>
                        <h2 className="text-xl sm:text-2xl font-bold flex items-center">
                            <Handshake className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                            <span className="group-hover: transition-colors duration-300">Heritage</span>
                            <span className="text-primary">Verse</span>
                        </h2>
                    </CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody>
                    <Textarea
                        placeholder="Entrez votre histoire ici..."
                        className="mt-2 max-h-60 resize-none"
                        onChange={(e) => {
                            setText(e.target.value);
                            setHistoryText(e.target.value);
                        }}
                        value={text}
                    />
                </CredenzaBody>
                <CredenzaFooter className='w-full flex items-center justify-between'>
                    <CredenzaClose asChild>
                        <Button id="audio-import-close" variant="outline">
                            Annuler
                        </Button>
                    </CredenzaClose>

                    <Button
                        disabled={!text.trim()}
                        className="text-white"
                        onClick={handleHistoryCreating}
                    >
                        {isCreating ? <Loader className="w-6 h-6 animate-spin" /> : 'Créer l’histoire'}
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}

export default TextInputComponent