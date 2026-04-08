import { CalendarCheck, Truck, Sparkles, SmilePlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Book Visit",
    description: "Choose your service and preferred time. We are flexible.",
  },
  {
    number: "02",
    icon: Truck,
    title: "We Arrive",
    description: "Our fully equipped van arrives at your location on time.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "The Magic Happens",
    description: "We deep clean, polish, and protect your vehicle.",
  },
  {
    number: "04",
    icon: SmilePlus,
    title: "You Enjoy",
    description: "Drive a car that feels and smells brand new.",
  },
];

function StepCard({ step }: { step: Step }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center hover:-translate-y-0.5 hover:shadow-md transition-[transform,box-shadow] duration-200 ease-out">
      <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 shrink-0">
        <step.icon className="w-7 h-7 text-accent" strokeWidth={1.5} />
      </div>
      <span className="text-[10px] font-extrabold text-accent tracking-widest mb-1.5 uppercase">
        Step {step.number}
      </span>
      <h3 className="font-bold text-base mb-2">{step.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="px-4 md:px-8 lg:px-16 py-16 bg-muted/30"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="font-bold text-3xl md:text-4xl mb-3">
            How GaadiGlow Works
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mb-4 rounded-full" />
          <p className="text-muted-foreground max-w-xl mx-auto">
            Simple, efficient, and transparent steps to a spotless car.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}