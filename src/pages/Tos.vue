<template>
   <section class="prose dark:prose-invert mt-10 mx-auto p-10 flex flex-col relative max-w-prose">
      <article class="text-center">
         <h1 class="text-4xl font-bold mb-4">Terms of Service</h1>
         <p class="text-muted-foreground mb-6">Last Updated: <span>{{ lastUpdated }}</span></p>
      </article>
 
     <article>
       <h2 class="text-2xl font-semibold mt-6 mb-2">1. Description of Service</h2>
       <p class="text-muted-foreground">
         Tiny Rabbit is a Discord bot that provides various features and functionalities to enhance your Discord server experience.
       </p>
     </article>
 
     <article>
       <h2 class="text-2xl font-semibold mt-6 mb-2">2. Eligibility</h2>
       <p class="text-muted-foreground">
         You must be at least 13 years old to use this Service. By using the Service, you represent and warrant that you meet this age requirement.
       </p>
     </article>
 
     <article>
       <h2 class="text-2xl font-semibold mt-6 mb-2">3. Account Responsibilities</h2>
       <p class="text-muted-foreground">
         You are responsible for maintaining the confidentiality of your Discord account and for all activities that occur under your account. Tiny Rabbit is not responsible for any loss or damage arising from your failure to protect your account.
       </p>
     </article>
 
     <article>
       <h2 class="text-2xl font-semibold mt-6 mb-2">4. Prohibited Conduct</h2>
       <p class="text-muted-foreground">
         When using the Service, you agree not to:
       </p>
       <ul class="list-disc list-inside text-muted-foreground ml-4">
         <li>Use the Service for any illegal purpose or in violation of any local, state, national, or international law.</li>
         <li>Harass, threaten, demean, embarrass, or cause distress or discomfort to any other user of the Service.</li>
         <li>Impersonate another person or entity.</li>
         <li>Interfere with or disrupt the Service or servers or networks connected to the Service.</li>
         <li>Use any automated means to access the Service, including bots, scrapers, or other methods.</li>
       </ul>
     </article>
 
     <article>
       <h2 class="text-2xl font-semibold mt-6 mb-2">5. Data Collection and Use</h2>
       <p class="text-muted-foreground">
         We collect and use data as described in our Privacy Policy. By using the Service, you consent to the collection and use of your data in accordance with the Privacy Policy.
       </p>
     </article>
 
     <article>
       <h2 class="text-2xl font-semibold mt-6 mb-2">6. Modifications to the Service</h2>
       <p class="text-muted-foreground">
         We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that Tiny Rabbit shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the Service.
       </p>
     </article>
 
     <article>
       <h2 class="text-2xl font-semibold mt-6 mb-2">7. Termination</h2>
       <p class="text-muted-foreground">
         We may terminate or suspend your access to the Service at any time, with or without cause or notice, if we believe that you have violated these Terms. Upon termination, your right to use the Service will immediately cease.
       </p>
     </article>
 
     <article>
       <h2 class="text-2xl font-semibold mt-6 mb-2">8. Disclaimers</h2>
       <p class="text-muted-foreground">
         The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Tiny Rabbit makes no warranties, express or implied, regarding the Service, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
       </p>
     </article>
 
     <article>
       <h2 class="text-2xl font-semibold mt-6 mb-2">9. Limitation of Liability</h2>
       <p class="text-muted-foreground">
         To the fullest extent permitted by applicable law, Tiny Rabbit shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (i) your use of or inability to use the Service; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein; (iii) any interruption or cessation of transmission to or from the Service; (iv) any bugs, viruses, trojan horses, or the like that may be transmitted to or through the Service by any third party; or (v) any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Service.
       </p>
     </article>
 
     <article>
       <h2 class="text-2xl font-semibold mt-6 mb-2">10. Governing Law</h2>
       <p class="text-muted-foreground">
         These Terms shall be governed by and construed in accordance with the laws of EU/Poland, without regard to its conflict of law principles.
       </p>
     </article>
 
     <article>
       <h2 class="text-2xl font-semibold mt-6 mb-2">11. Changes to Terms</h2>
       <p class="text-muted-foreground">
         We reserve the right to revise these Terms at any time by posting the revised Terms on the Service. Your continued use of the Service after such changes have been posted constitutes your acceptance of the new Terms.
       </p>
     </article>
 
     <article>
       <h2 class="text-2xl font-semibold mt-6 mb-2">12. Contact Information</h2>
       <p class="text-muted-foreground">
         If you have any questions about these Terms, please contact us at <a href="mailto:kris@rabbittale.co" class="underline text-primary">kris@rabbittale.co</a>.
       </p>
     </article>
 
     <p class="text-muted-foreground mt-6">
       By using the Tiny Rabbit Discord bot, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
     </p>
   </section>
 </template>
 
 <script setup>
import { ref } from 'vue'

const lastUpdated = ref('July 11, 2024')
</script>