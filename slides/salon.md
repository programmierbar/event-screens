---
theme: ./../theme
title: programmier.bar Event Slides
transition: fade-out
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true

layout: title-icons
titleVariant: podcast

clicks: 2

---
<BackgroundAudio />
<Logo />

---
layout: title-icons
titleVariant: podcast
---
<Logo />
<Autoplay :seconds="10" :enabled="true" />


---
layout: podcast-feeds
---
<Logo />
<Autoplay :seconds="10" :enabled="true" />

---
layout: podcast-covers
---
<Autoplay :seconds="10" :enabled="true" />

---
src: pages/feedback.md
---
THIS CONTENT WILL BE OVERWRITEN BY IMPORTED SLIDE

---
layout: podcast-reviews
---
<Logo />
<Autoplay :seconds="10" :enabled="true" :restart-at="2"/>
