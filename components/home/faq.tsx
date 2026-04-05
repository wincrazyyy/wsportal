import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


export function FAQ() {
  return (
    <section className="w-full py-24 bg-background flex flex-col items-center">
      <div className="max-w-3xl mx-auto px-5 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about the Mastery System.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          
          <AccordionItem value="item-1" className="border-b border-border/50 py-2">
            <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors">
              Is this for Math Analysis and Approaches (AA) or Applications and Interpretation (AI)?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              This specific mastery system is optimized for IBDP Math AA (both HL and SL). However, the foundational modules and algebra bridging support are highly beneficial for AI students as well. 
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-b border-border/50 py-2">
            <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors">
              What happens if I miss a live Zoom lesson?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              Don't worry. Every live lesson is recorded in high definition and uploaded to your secure Document Vault within 24 hours. You can watch the replays as many times as you need.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-b border-border/50 py-2">
            <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors">
              How long do I have access to the materials?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              When you enroll in the Mastery System, you get full access for the entire duration of your IB Diploma Programme (up to 24 months). You will have everything you need right up until your final exams.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-b border-border/50 py-2">
            <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors">
              Are the past papers legally sourced?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              Yes. We provide curated walk-throughs and customized practice questions heavily inspired by historical trends (2008–2025) to ensure you are practicing exactly what the examiners are looking for, completely in line with academic guidelines.
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </section>
  );
}
