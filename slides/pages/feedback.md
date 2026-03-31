---
layout: feedback
---

<h1>Sei Teil unserer stetigen Verbesserung!</h1>

<p>Schenk uns eine Minute für <span v-mark="{ at: 1, color: '#cfff00', type: 'underline', strokeWidth: 5 }">Feedback:</span></p>

<CustomImage :src="'/assets/feedback-qr.svg'" width="180pt" />

<Logo />

<!--
1. show the text-stroke
2. nav to next slide
-->
<Autoclick :seconds="[2, 10]" />
