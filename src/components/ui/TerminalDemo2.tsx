import {
    Terminal,
    TypingAnimation,
} from "@/components/ui/terminal"

export function TerminalDemo2() {
    return (
        <div className="relative flex w-full max-w-lg items-center justify-center">
            <Terminal className="bg-[#1e1e1e]/80 backdrop-blur-md text-[#cccccc] border-[#333333]/50 shadow-2xl [&_.border-border]:border-[#333333]/50">
                <TypingAnimation duration={20}>$ sudo su</TypingAnimation>

                <TypingAnimation duration={20}>$ cat profile.json</TypingAnimation>

                <TypingAnimation duration={20}>{"{"}</TypingAnimation>

                <TypingAnimation duration={20} className="pl-4">
                    "name": "Nattakit Kerdtalay",
                </TypingAnimation>

                <TypingAnimation duration={20} className="pl-4">
                    "roles": ["Full-Stack Developer", "AI Engineer"],
                </TypingAnimation>

                <TypingAnimation duration={20} className="pl-4">
                    "skills": [
                </TypingAnimation>

                <TypingAnimation duration={20} className="pl-8 text-[#ce9178]">
                    "eat", "sleep", "code", "repeat"
                </TypingAnimation>

                <TypingAnimation duration={20} className="pl-4">
                    ],
                </TypingAnimation>

                <TypingAnimation duration={20} className="pl-4">
                    "passion": "Building innovative apps"
                </TypingAnimation>

                <TypingAnimation duration={20}>{"}"}</TypingAnimation>

                <TypingAnimation duration={20}>$ echo "Nice to meet you!"</TypingAnimation>

                <TypingAnimation duration={20} className="text-[#4fc1ff] mt-2">
                    Nice to meet you!
                </TypingAnimation>
            </Terminal>
        </div>
    )
}
