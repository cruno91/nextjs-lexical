import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Badge } from "@repo/ui/components/ui/badge"
import { ArrowRight, Edit3, Zap, Shield, Star, CheckCircle } from "lucide-react"

export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center space-y-4 py-24 md:py-32">
        <Badge variant="secondary" className="mb-4">
          <Zap className="mr-1 h-3 w-3" />
          Powered by Lexical
        </Badge>
        <h1 className="text-center text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          The Future of Rich Text Editing
          <br />
          <span className="text-primary">Built with Next.js</span>
        </h1>
        <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
          Experience the power of Lexical editor integrated seamlessly with Next.js 15. Create, edit, and collaborate
          with lightning-fast performance and modern design.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="gap-2">
            Try Demo <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            View Documentation
          </Button>
        </div>
      </section>

      {/* Features Section (3-ups) */}
      <section id="features" className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why Choose NextLex?</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for developers who demand performance, flexibility, and modern user experience.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Built on Next.js 15 with optimized performance and server-side rendering for instant loading.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Server Components
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Edge Runtime Support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Optimized Bundle Size
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Edit3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Rich Text Editor</CardTitle>
              <CardDescription>
                Powerful Lexical editor with extensible plugins and customizable toolbar components.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Plugin Architecture
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Custom Nodes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Real-time Collaboration
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Enterprise Ready</CardTitle>
              <CardDescription>
                Production-ready with TypeScript, testing, and security best practices built-in.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  TypeScript Support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Security Headers
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Testing Suite
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="bg-muted/50 py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">See It In Action</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Experience the power of NextLex with our interactive demo
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Edit3 className="h-16 w-16 mx-auto text-primary" />
                  <h3 className="text-2xl font-semibold">Interactive Editor Demo</h3>
                  <p className="text-muted-foreground">Click below to launch the full-featured Lexical editor</p>
                  <Button size="lg" className="gap-2">
                    Launch Demo <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-24">
        <div className="grid gap-8 md:grid-cols-4 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">10k+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">50ms</div>
            <div className="text-sm text-muted-foreground">Avg Response</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/50 py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What Developers Say</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  "NextLex has transformed how we handle rich text editing. The integration with Next.js is seamless.",
                author: "Sarah Chen",
                role: "Senior Developer",
                company: "TechCorp",
              },
              {
                quote: "The performance improvements are incredible. Our users love the responsive editing experience.",
                author: "Mike Johnson",
                role: "CTO",
                company: "StartupXYZ",
              },
              {
                quote:
                  "Finally, a rich text editor that doesn't compromise on developer experience or user experience.",
                author: "Emily Rodriguez",
                role: "Product Manager",
                company: "InnovateLab",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-sm mb-4">"{testimonial.quote}"</blockquote>
                <div className="text-sm">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <Card className="p-12 text-center bg-primary text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of developers building amazing rich text experiences with NextLex.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="gap-2">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Contact Sales
            </Button>
          </div>
        </Card>
      </section>
    </>
  )
}
