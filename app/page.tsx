import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartHandshake, BookOpen, Mic, Globe, Heart, Users, Zap, Github, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-zinc-900 dark:to-zinc-800 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-20 left-10 w-20 h-20 bg-orange-300 rounded-full"></div>
          <div className="absolute bottom-32 right-20 w-16 h-16 bg-amber-300 rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-orange-200 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-2xl text-center md:text-left z-10">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Préservons notre héritage
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-800 dark:text-white leading-tight mb-6">
            Racontez et partagez l'
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">héritage africain</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mb-8 leading-relaxed">
            Découvrez, créez et partagez des contes oraux enrichis par l'intelligence artificielle.
            Une plateforme moderne pour préserver et transmettre nos histoires ancestrales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button asChild className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-3">
              <Link href="/histories">
                <BookOpen className="mr-2 w-5 h-5" />
                Découvrir les histoires
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-400 dark:hover:bg-orange-950 transition-all duration-300 text-lg px-8 py-3">
              <Link href="/create">
                <Mic className="mr-2 w-5 h-5" />
                Créer votre conte
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-orange-500" />
              <span>1000+ histoires partagées</span>
            </div>
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-2 text-orange-500" />
              <span>15 langues africaines</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-orange-500" />
              <span>Propulsé par l'IA</span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 max-w-lg mt-12 md:mt-0 z-10">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl blur-lg opacity-20"></div>
            <img
              src="/heroSection.png"
              alt="Illustration HeritageVerse - Contes africains"
              className="relative w-full max-w-md mx-auto filter drop-shadow-2xl rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-zinc-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-3">
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Fonctionnalités principales
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-white mb-6">
              Tout ce dont vous avez besoin pour 
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"> préserver l'héritage</span>
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
              Découvrez les outils qui vous permettront de préserver et partager la richesse culturelle africaine avec le monde entier
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="group hover:-translate-y-2 transition-all duration-300">
              <Card className="p-8 text-center h-full hover:shadow-2xl transition-all duration-500 dark:bg-zinc-800 dark:border-zinc-700 border-0 shadow-lg bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-4">
                    Histoires illustrées
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                    Écoutez et lisez des contes africains authentiques enrichis d'illustrations captivantes et d'une narration immersive
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">
                      Audio
                    </span>
                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">
                      Visuel
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Feature 2 */}
            <div className="group hover:-translate-y-2 transition-all duration-300">
              <Card className="p-8 text-center h-full hover:shadow-2xl transition-all duration-500 dark:bg-zinc-800 dark:border-zinc-700 border-0 shadow-lg bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-4">
                    Création vocale
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                    Partagez vos propres contes en utilisant votre voix ou en rédigeant votre histoire avec l'aide de l'intelligence artificielle
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">
                      Voix
                    </span>
                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">
                      IA
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Feature 3 */}
            <div className="group hover:-translate-y-2 transition-all duration-300">
              <Card className="p-8 text-center h-full hover:shadow-2xl transition-all duration-500 dark:bg-zinc-800 dark:border-zinc-700 border-0 shadow-lg bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-4">
                    Langues africaines
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                    Profitez de traductions dans plusieurs langues africaines pour une expérience authentique et accessible à tous
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">
                      15 langues
                    </span>
                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">
                      Traduction
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Prêt à commencer votre voyage dans l'héritage africain ?
            </p>
            <Button asChild className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3">
              <Link href="/create">
                <HeartHandshake className="mr-2 w-5 h-5" />
                Commencer maintenant
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-beige dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 dark:text-white mb-4">
            Une plateforme, une mission.
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8">
            HeritageVerse est né d'un rêve simple : <br className="hidden md:block" />
            transmettre nos histoires et célébrer les voix africaines avec l'aide de l'IA.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button asChild className="bg-primary text-white hover:bg-primary/80">
              <Link href="/histories">
                Explorer les récits
              </Link>
            </Button>
            <Button asChild variant="outline" className="border text-primary hover:bg-primary/10 dark:text-primary-foreground">
              <Link href="/create">
                Contribuer à l'héritage
              </Link>
            </Button>
          </div>

          <div className="flex justify-center items-center gap-6 mt-10">
            <Heart className="w-6 h-6 text-primary" />
            <Users className="w-6 h-6 text-primary" />
            <Zap className="w-6 h-6 text-primary" />
          </div>

          <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-4">
            Une initiative soutenue par la communauté tech africaine et Google.
          </p>
        </div>
      </section>
    </main >
  );
}
