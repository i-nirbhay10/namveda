"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Eye,
  Lock,
  Users,
  Globe,
  Mail,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AdBanner } from "@/components/ad-banner";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 24, 2025";

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <SidebarTrigger className="md:hidden" />
        <div className="flex-1 min-w-0">
          <h1 className="text-responsive-3xl">Privacy Policy</h1>
          <p className="text-responsive-base text-muted-foreground mt-1 sm:mt-2">
            How we collect, use, and protect your information
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              Last Updated: {lastUpdated}
            </Badge>
          </div>
        </div>
      </div>

      {/* Mobile In-Content Ad */}
      <AdBanner slot="in-content" className="md:hidden mb-4" />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
        {/* Table of Contents - Sidebar */}
        <div className="xl:col-span-1">
          <Card className="sticky top-4">
            <CardHeader className="pb-4">
              <CardTitle className="text-responsive-lg">
                Quick Navigation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <nav className="space-y-1">
                <a
                  href="#overview"
                  className="block text-sm hover:text-primary transition-colors py-1"
                >
                  1. Overview
                </a>
                <a
                  href="#information-we-collect"
                  className="block text-sm hover:text-primary transition-colors py-1"
                >
                  2. Information We Collect but Do Not Store
                </a>
                <a
                  href="#how-we-use"
                  className="block text-sm hover:text-primary transition-colors py-1"
                >
                  3. How We Use Information
                </a>
                <a
                  href="#information-sharing"
                  className="block text-sm hover:text-primary transition-colors py-1"
                >
                  4. Information Sharing
                </a>
                <a
                  href="#data-security"
                  className="block text-sm hover:text-primary transition-colors py-1"
                >
                  5. Data Security
                </a>
                <a
                  href="#cookies"
                  className="block text-sm hover:text-primary transition-colors py-1"
                >
                  6. Cookies & Tracking
                </a>
                <a
                  href="#third-party"
                  className="block text-sm hover:text-primary transition-colors py-1"
                >
                  7. Third-Party Services
                </a>
                <a
                  href="#user-rights"
                  className="block text-sm hover:text-primary transition-colors py-1"
                >
                  8. Your Rights
                </a>
                <a
                  href="#children"
                  className="block text-sm hover:text-primary transition-colors py-1"
                >
                  9. Children's Privacy
                </a>
                <a
                  href="#changes"
                  className="block text-sm hover:text-primary transition-colors py-1"
                >
                  10. Policy Changes
                </a>
                <a
                  href="#contact"
                  className="block text-sm hover:text-primary transition-colors py-1"
                >
                  11. Contact Us
                </a>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="xl:col-span-3 space-y-6">
          {/* Overview */}
          <Card id="overview">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-responsive-xl">
                <Shield className="h-5 w-5 text-green-600" />
                1. Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-responsive-base leading-relaxed">
                Welcome to Namveda ("we," "our," or "us"). We are committed to
                protecting your privacy and ensuring the security of your
                personal information. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                use our AI-powered baby name generator service.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <p className="text-responsive-sm text-blue-800 dark:text-blue-200">
                  <strong>Key Principle:</strong> We collect only the minimum
                  information necessary to provide our service and never sell
                  your personal data to third parties.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Information We Collect but Do Not Store */}
          <Card id="information-we-collect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-responsive-xl">
                <Eye className="h-5 w-5 text-blue-600" />
                2. Information We Collect but Do Not Store
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-responsive-lg font-semibold mb-2">
                    2.1 Information You Provide
                  </h3>
                  <ul className="space-y-2 text-responsive-base">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong>Name Generation Preferences:</strong>{" "}
                        Inspirations, gender preferences, religious background,
                        style preferences, and desired meanings
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong>Birth Information:</strong> Birth dates, times,
                        and places for astrological name suggestions (optional)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong>Donation Information:</strong> Name and email
                        address when making donations (optional)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong>Feedback and Support:</strong> Messages,
                        questions, or feedback you send us
                      </span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-responsive-lg font-semibold mb-2">
                    2.2 Information Automatically Collected
                  </h3>
                  <ul className="space-y-2 text-responsive-base">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong>Usage Data:</strong> Pages visited, features
                        used, time spent on the service, and interaction
                        patterns
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong>Device Information:</strong> Browser type,
                        operating system, device type, and screen resolution
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong>Technical Data:</strong> IP address, cookies,
                        session data, and error logs
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card id="how-we-use">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-responsive-xl">
                <Globe className="h-5 w-5 text-green-600" />
                3. How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-responsive-base">
                We use the collected information for the following purposes:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-responsive-base font-semibold text-green-700 dark:text-green-300">
                    Service Provision
                  </h4>
                  <ul className="space-y-1 text-responsive-sm">
                    <li>• Generate personalized name suggestions</li>
                    <li>• Provide astrological and numerological insights</li>
                    <li>• Match sibling names harmoniously</li>
                    <li>• Save and manage favorite names</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-responsive-base font-semibold text-blue-700 dark:text-blue-300">
                    Service Improvement
                  </h4>
                  <ul className="space-y-1 text-responsive-sm">
                    <li>• Analyze usage patterns and preferences</li>
                    <li>• Improve AI model accuracy</li>
                    <li>• Develop new features and functionality</li>
                    <li>• Fix bugs and technical issues</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-responsive-base font-semibold text-purple-700 dark:text-purple-300">
                    Communication
                  </h4>
                  <ul className="space-y-1 text-responsive-sm">
                    <li>• Respond to support requests</li>
                    <li>• Send important service updates</li>
                    <li>• Process donation transactions</li>
                    <li>• Provide customer support</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-responsive-base font-semibold text-orange-700 dark:text-orange-300">
                    Legal & Security
                  </h4>
                  <ul className="space-y-1 text-responsive-sm">
                    <li>• Comply with legal obligations</li>
                    <li>• Prevent fraud and abuse</li>
                    <li>• Protect user safety and security</li>
                    <li>• Enforce our terms of service</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card id="information-sharing">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-responsive-xl">
                <Users className="h-5 w-5 text-orange-600" />
                4. Information Sharing and Disclosure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                <p className="text-responsive-base text-red-800 dark:text-red-200 font-semibold">
                  We do NOT sell, rent, or trade your personal information to
                  third parties for marketing purposes.
                </p>
              </div>

              <p className="text-responsive-base">
                We may share your information only in the following
                circumstances:
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="text-responsive-base font-semibold">
                    Service Providers
                  </h4>
                  <p className="text-responsive-sm text-muted-foreground">
                    With trusted third-party service providers who help us
                    operate our service (hosting, analytics, payment
                    processing). These providers are bound by strict
                    confidentiality agreements.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="text-responsive-base font-semibold">
                    Legal Requirements
                  </h4>
                  <p className="text-responsive-sm text-muted-foreground">
                    When required by law, court order, or government regulation,
                    or to protect our rights, property, or safety.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="text-responsive-base font-semibold">
                    Business Transfers
                  </h4>
                  <p className="text-responsive-sm text-muted-foreground">
                    In connection with a merger, acquisition, or sale of assets,
                    with appropriate notice to users.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="text-responsive-base font-semibold">
                    Aggregated Data
                  </h4>
                  <p className="text-responsive-sm text-muted-foreground">
                    We may share anonymized, aggregated data that cannot
                    identify individual users for research and analytics
                    purposes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card id="data-security">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-responsive-xl">
                <Lock className="h-5 w-5 text-red-600" />
                5. Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-responsive-base">
                We implement industry-standard security measures to protect your
                information:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-responsive-base font-semibold">
                    Technical Safeguards
                  </h4>
                  <ul className="space-y-1 text-responsive-sm">
                    <li>• SSL/TLS encryption for data transmission</li>
                    <li>• Encrypted data storage</li>
                    <li>• Regular security audits and updates</li>
                    <li>• Secure server infrastructure</li>
                    <li>• Access controls and authentication</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-responsive-base font-semibold">
                    Operational Safeguards
                  </h4>
                  <ul className="space-y-1 text-responsive-sm">
                    <li>• Limited employee access to personal data</li>
                    <li>• Regular staff training on privacy practices</li>
                    <li>• Incident response procedures</li>
                    <li>• Data backup and recovery systems</li>
                    <li>• Third-party security assessments</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                <p className="text-responsive-sm text-yellow-800 dark:text-yellow-200">
                  <AlertTriangle className="h-4 w-4 inline mr-2" />
                  <strong>Important:</strong> While we implement strong security
                  measures, no method of transmission over the internet is 100%
                  secure. We cannot guarantee absolute security of your
                  information.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookies & Tracking */}
          <Card id="cookies">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-responsive-xl">
                <Globe className="h-5 w-5 text-indigo-600" />
                6. Cookies and Tracking Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-responsive-base">
                We use cookies and similar technologies to enhance your
                experience and analyze service usage:
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-responsive-base font-semibold mb-2">
                    Types of Cookies We Use:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="text-xs">
                        Essential
                      </Badge>
                      <div>
                        <p className="text-responsive-sm">
                          <strong>Necessary Cookies:</strong> Required for basic
                          site functionality, user authentication, and security.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="text-xs">
                        Analytics
                      </Badge>
                      <div>
                        <p className="text-responsive-sm">
                          <strong>Performance Cookies:</strong> Help us
                          understand how users interact with our service to
                          improve functionality.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="text-xs">
                        Preferences
                      </Badge>
                      <div>
                        <p className="text-responsive-sm">
                          <strong>Functional Cookies:</strong> Remember your
                          preferences and settings for a personalized
                          experience.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-responsive-base font-semibold mb-2">
                    Managing Cookies:
                  </h4>
                  <p className="text-responsive-sm text-muted-foreground">
                    You can control cookies through your browser settings.
                    However, disabling certain cookies may affect the
                    functionality of our service. Most browsers allow you to:
                  </p>
                  <ul className="mt-2 space-y-1 text-responsive-sm">
                    <li>• View and delete cookies</li>
                    <li>• Block cookies from specific sites</li>
                    <li>• Block third-party cookies</li>
                    <li>• Clear all cookies when closing the browser</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card id="third-party">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-responsive-xl">
                <Globe className="h-5 w-5 text-teal-600" />
                7. Third-Party Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-responsive-base">
                Our service integrates with the following third-party services,
                each with their own privacy policies:
              </p>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-responsive-base font-semibold mb-2">
                    AI Services
                  </h4>
                  <p className="text-responsive-sm text-muted-foreground mb-2">
                    We use Google's Gemini AI for name generation. Your prompts
                    are processed according to Google's privacy policy.
                  </p>
                  <Link
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    View Google Privacy Policy →
                  </Link>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-responsive-base font-semibold mb-2">
                    Payment Processing
                  </h4>
                  <p className="text-responsive-sm text-muted-foreground mb-2">
                    Razorpay processes donations and handles payment information
                    securely. We do not store payment details.
                  </p>
                  <Link
                    href="https://razorpay.com/privacy/"
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    View Razorpay Privacy Policy →
                  </Link>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-responsive-base font-semibold mb-2">
                    Analytics
                  </h4>
                  <p className="text-responsive-sm text-muted-foreground mb-2">
                    We may use analytics services to understand user behavior
                    and improve our service. These services collect anonymized
                    usage data.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-responsive-base font-semibold mb-2">
                    Advertising
                  </h4>
                  <p className="text-responsive-sm text-muted-foreground mb-2">
                    We may display advertisements through third-party ad
                    networks. These networks may use cookies to show relevant
                    ads.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card id="user-rights">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-responsive-xl">
                <Shield className="h-5 w-5 text-green-600" />
                8. Your Rights and Choices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-responsive-base">
                You have the following rights regarding your personal
                information:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="text-responsive-base font-semibold">
                      Access
                    </h4>
                    <p className="text-responsive-sm text-muted-foreground">
                      Request a copy of the personal information we hold about
                      you.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="text-responsive-base font-semibold">
                      Correction
                    </h4>
                    <p className="text-responsive-sm text-muted-foreground">
                      Request correction of inaccurate or incomplete
                      information.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="text-responsive-base font-semibold">
                      Deletion
                    </h4>
                    <p className="text-responsive-sm text-muted-foreground">
                      Request deletion of your personal information (subject to
                      legal requirements).
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="text-responsive-base font-semibold">
                      Portability
                    </h4>
                    <p className="text-responsive-sm text-muted-foreground">
                      Request your data in a portable format to transfer to
                      another service.
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-responsive-base font-semibold">
                      Restriction
                    </h4>
                    <p className="text-responsive-sm text-muted-foreground">
                      Request limitation of how we process your information.
                    </p>
                  </div>
                  <div className="border-l-4 border-teal-500 pl-4">
                    <h4 className="text-responsive-base font-semibold">
                      Objection
                    </h4>
                    <p className="text-responsive-sm text-muted-foreground">
                      Object to certain types of processing of your information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <p className="text-responsive-sm text-blue-800 dark:text-blue-200">
                  <strong>How to Exercise Your Rights:</strong> Contact us at{" "}
                  <Link
                    href="mailto:nirbhayverma899@gmail.com"
                    className="underline"
                  >
                    nirbhayverma899@gmail.com
                  </Link>{" "}
                  with your request. We will respond within 30 days and may
                  require identity verification.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card id="children">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-responsive-xl">
                <Users className="h-5 w-5 text-pink-600" />
                9. Children's Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <p className="text-responsive-base text-pink-800 dark:text-pink-200 font-semibold">
                  Our service is not intended for children under 13 years of
                  age.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-responsive-base">
                  We do not knowingly collect personal information from children
                  under 13. If you are a parent or guardian and believe your
                  child has provided us with personal information, please
                  contact us immediately.
                </p>

                <p className="text-responsive-base">
                  If we discover that we have collected personal information
                  from a child under 13 without parental consent, we will take
                  steps to delete that information as quickly as possible.
                </p>

                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="text-responsive-base font-semibold">
                    For Parents:
                  </h4>
                  <ul className="mt-2 space-y-1 text-responsive-sm">
                    <li>• Monitor your child's internet usage</li>
                    <li>
                      • Contact us if you have concerns about your child's data
                    </li>
                    <li>
                      • We will cooperate fully with parental requests regarding
                      children's data
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Policy Changes */}
          <Card id="changes">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-responsive-xl">
                <Calendar className="h-5 w-5 text-indigo-600" />
                10. Changes to This Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-responsive-base">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices, technology, legal requirements, or
                other factors.
              </p>

              <div className="space-y-3">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="text-responsive-base font-semibold">
                    How We Notify You:
                  </h4>
                  <ul className="mt-2 space-y-1 text-responsive-sm">
                    <li>• Prominent notice on our website</li>
                    <li>
                      • Email notification for significant changes (if you've
                      provided an email)
                    </li>
                    <li>
                      • Updated "Last Modified" date at the top of this policy
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="text-responsive-base font-semibold">
                    Your Continued Use:
                  </h4>
                  <p className="text-responsive-sm text-muted-foreground">
                    Your continued use of our service after any changes
                    indicates your acceptance of the updated Privacy Policy. If
                    you disagree with changes, please discontinue using our
                    service.
                  </p>
                </div>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <p className="text-responsive-sm text-indigo-800 dark:text-indigo-200">
                  <strong>Recommendation:</strong> We encourage you to review
                  this Privacy Policy periodically to stay informed about how we
                  protect your information.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card id="contact">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-responsive-xl">
                <Mail className="h-5 w-5 text-blue-600" />
                11. Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-responsive-base">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact us:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="border rounded-lg p-4">
                    <h4 className="text-responsive-base font-semibold mb-2">
                      Email
                    </h4>
                    <p className="text-responsive-sm">
                      <Link
                        href="mailto:nirbhayverma899@gmail.com"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        nirbhayverma899@gmail.com
                      </Link>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      For privacy-related inquiries
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="text-responsive-base font-semibold mb-2">
                      General Support
                    </h4>
                    <p className="text-responsive-sm">
                      <Link
                        href="mailto:nirbhayverma899@gmail.com"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        nirbhayverma899@gmail.com
                      </Link>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      For general questions and support
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="border rounded-lg p-4">
                    <h4 className="text-responsive-base font-semibold mb-2">
                      Response Time
                    </h4>
                    <p className="text-responsive-sm">
                      We aim to respond to all privacy inquiries within:
                    </p>
                    <ul className="mt-2 space-y-1 text-responsive-sm">
                      <li>• General questions: 2-3 business days</li>
                      <li>• Data requests: 30 days (as required by law)</li>
                      <li>• Urgent matters: 24-48 hours</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <p className="text-responsive-sm text-muted-foreground">
                  <strong>Note:</strong> This Privacy Policy is effective as of{" "}
                  {lastUpdated} and applies to all information collected by
                  Namveda. For the most current version, please visit this page
                  regularly.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ad Space */}
          {/* <AdBanner slot="in-content" /> */}
        </div>
      </div>
    </div>
  );
}
