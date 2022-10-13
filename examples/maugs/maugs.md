---
title: "Math augmentations"
author:
  - name: Vishal Devireddy
section-numbers: false
output:
  html:
    selfContained: true
    styles: styles.css
    theme: acm
---

::: abstract
my abstract
:::

::: aside
Try clicking on the symbols in the equations!
:::

# heading 1

Our solution to this problem depends on a linear approximation to the behavior of $F(@x)$ in the neighborhood of $@x$, as do all subsequent solutions in this paper. In particular, for small $@h$,

~~~ definitions
F(@x) + G(@x) :: Both stereo images
F(@x) :: The first stereo image
G(@x) :: The second stereo image
F(@x + @h) :: The best translated F(@x) to approximate G(@x)
~~~

## Heading 2

~~~ definitions
@h :: idk lol
@x :: position
~~~

~~~ equation {#e1}
F(@x) \approx \frac{F(@x + @h) - F(@x)}{@h} = \frac{G(@x) - F(@x)}{@h}
~~~

### subheading 2.1

so that

##### incorrect heading

###### thing

## Heading 3

~~~ equation {#e2}
@h = \frac{G(@x) - F(@x)}{F'(@x)}
~~~