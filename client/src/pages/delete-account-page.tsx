import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function DeleteAccountPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("_subject", "Account Deletion Request - GaadiGlow");
    formData.append("_template", "table");
    formData.append("_captcha", "false");

    try {
      const res = await fetch("https://formsubmit.co/gaadiglow@gmail.com", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSubmitStatus("success");
        form.reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Request Account Deletion - GaadiGlow</title>
        <meta
          name="description"
          content="Request to delete your GaadiGlow account. Learn what data will be deleted and submit your deletion request."
        />
      </Helmet>

      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Request Account Deletion
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're sorry to see you go. Request to permanently delete your account and associated data.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Information Section */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <AlertTriangle className="h-5 w-5 text-accent" />
                    What Happens When You Delete Your Account?
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Please read the following information carefully before proceeding.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4 text-foreground">
                      Data That Will Be Deleted:
                    </h3>
                    <ul className="space-y-3 text-foreground">
                      <li className="flex items-start gap-3">
                        <span className="text-destructive font-bold mt-1">•</span>
                        <span><strong className="text-foreground">Phone Number:</strong> <span className="text-muted-foreground">Your registered phone number will be permanently removed from our system.</span></span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-destructive font-bold mt-1">•</span>
                        <span><strong className="text-foreground">Profile Information:</strong> <span className="text-muted-foreground">All personal details including name, address, and preferences will be deleted.</span></span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-destructive font-bold mt-1">•</span>
                        <span><strong className="text-foreground">Payment History:</strong> <span className="text-muted-foreground">All transaction records and payment information will be permanently removed.</span></span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-destructive font-bold mt-1">•</span>
                        <span><strong className="text-foreground">Booking History:</strong> <span className="text-muted-foreground">All past and upcoming bookings will be deleted.</span></span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-destructive font-bold mt-1">•</span>
                        <span><strong className="text-foreground">Account Credentials:</strong> <span className="text-muted-foreground">Your username and password will be removed.</span></span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h3 className="font-semibold text-lg mb-4 text-foreground">
                      Data That May Be Retained:
                    </h3>
                    <ul className="space-y-3 text-foreground">
                      <li className="flex items-start gap-3">
                        <span className="text-accent font-bold mt-1">•</span>
                        <span><strong className="text-foreground">Legal Records:</strong> <span className="text-muted-foreground">We may retain certain information as required by law or for legal compliance purposes (e.g., tax records, dispute resolution).</span></span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent font-bold mt-1">•</span>
                        <span><strong className="text-foreground">Aggregated Data:</strong> <span className="text-muted-foreground">Anonymized, aggregated data that cannot identify you may be retained for analytics and service improvement.</span></span>
                      </li>
                    </ul>
                  </div>

                  <Alert className="bg-primary/10 border-primary/20">
                    <AlertTriangle className="h-4 w-4 text-primary" />
                    <AlertDescription className="text-foreground">
                      <strong className="text-foreground">Important:</strong> Account deletion is permanent and cannot be undone. 
                      Please ensure you have saved any important information before proceeding.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Alternative Contact Method */}
              <Card className="bg-card border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-foreground">Alternative Ways to Request Deletion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    If you prefer not to use the form, you can also request account deletion by:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-foreground">Email:</span>
                      <a
                        href="mailto:gaadiglow@gmail.com?subject=Account Deletion Request"
                        className="text-primary hover:underline font-medium"
                      >
                        gaadiglow@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-foreground">Phone:</span>
                      <a
                        href="tel:+917800800122"
                        className="text-primary hover:underline font-medium"
                      >
                        7800800122
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Request Form */}
            <div className="lg:col-span-1">
              <Card className="bg-card border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Trash2 className="h-5 w-5 text-destructive" />
                    Submit Deletion Request
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Fill out the form below to request account deletion.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Enter your full name"
                        disabled={isSubmitting}
                        className="bg-background text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        disabled={isSubmitting}
                        className="bg-background text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="Enter your phone number"
                        disabled={isSubmitting}
                        className="bg-background text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-foreground">Username (if applicable)</Label>
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        disabled={isSubmitting}
                        className="bg-background text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason" className="text-foreground">Reason for Deletion (Optional)</Label>
                      <Textarea
                        id="reason"
                        name="reason"
                        placeholder="Please let us know why you're deleting your account (optional)"
                        rows={4}
                        disabled={isSubmitting}
                        className="bg-background text-foreground"
                      />
                    </div>

                    {submitStatus === "success" && (
                      <Alert className="bg-green-500/10 border-green-500/20">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <AlertDescription className="text-green-700 dark:text-green-300">
                          Your deletion request has been submitted successfully. 
                          We will process your request within 7-10 business days.
                        </AlertDescription>
                      </Alert>
                    )}

                    {submitStatus === "error" && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          There was an error submitting your request. 
                          Please try again or contact us directly via email.
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      variant="destructive"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Submit Deletion Request
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you confirm that you want to permanently delete your account.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
