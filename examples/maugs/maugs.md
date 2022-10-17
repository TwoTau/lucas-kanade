---
title: "Math augmentations"
author:
  - name: Vishal Devireddy
section-numbers: false
output:
  html:
    selfContained: true
    styles: styles.css
    theme: default
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

##### super long heading that spans multiple lines and requires wrapping {#wraps}

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

**One** Ac tortor vitae purus faucibus ornare suspendisse sed. Egestas pretium aenean pharetra magna. Quisque id diam vel quam elementum pulvinar etiam non. Ac felis donec et odio pellentesque diam volutpat commodo sed. Sodales ut etiam sit amet nisl purus. Id aliquet lectus proin nibh. Tortor at auctor urna nunc id cursus. Odio ut sem nulla pharetra diam. Nisl tincidunt eget nullam non nisi est sit amet facilisis. Tellus integer feugiat scelerisque varius morbi enim nunc faucibus a. Adipiscing elit ut aliquam purus sit.

::: figure {.margin sticky-through="#heading-3"}
This will be sticky for two paragraphs $(Two \leq x \leq Three)$ If stacking sticky figures with contained intervals works, this should slide smoothly under the previous sticky.
:::

###### thing

**Two** Quis eleifend quam adipiscing vitae. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Tempus egestas sed sed risus pretium quam. Sit amet cursus sit amet dictum. Tristique risus nec feugiat in fermentum posuere urna nec. Eu augue ut lectus arcu. Convallis tellus id interdum velit laoreet id donec. Dui nunc mattis enim ut tellus elementum sagittis. Est velit egestas dui id ornare arcu odio. Nulla pharetra diam sit amet nisl suscipit adipiscing. Ante metus dictum at tempor commodo ullamcorper a lacus vestibulum. Orci eu lobortis elementum nibh tellus molestie nunc non. Mattis pellentesque id nibh tortor id aliquet lectus proin. Eu feugiat pretium nibh ipsum. Mauris pharetra et ultrices neque.

**Three** Vehicula ipsum a arcu cursus vitae congue mauris. Volutpat odio facilisis mauris sit amet. Turpis egestas sed tempus urna. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. In hac habitasse platea dictumst vestibulum rhoncus. Euismod quis viverra nibh cras pulvinar. Elementum tempus egestas sed sed risus pretium quam. Nec ultrices dui sapien eget. Sed vulputate odio ut enim blandit volutpat. Dignissim convallis aenean et tortor at risus viverra. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium.

### yay

## Heading 3

~~~ equation {#e2}
@h = \frac{G(@x) - F(@x)}{F'(@x)}
~~~

### 3.1

Vehicula ipsum a arcu cursus vitae congue mauris. Volutpat odio facilisis mauris sit amet. Turpis egestas sed tempus urna. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. In hac habitasse platea dictumst vestibulum rhoncus. Euismod quis viverra nibh cras pulvinar. Elementum tempus egestas sed sed risus pretium quam. Nec ultrices dui sapien eget. Sed vulputate odio ut enim blandit volutpat. Dignissim convallis aenean et tortor at risus viverra. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium.

::: figure {.margin}
| Two happy quills.

![](https://idyll-lang.org/static/images/quill.svg) ![](https://idyll-lang.org/static/images/quill.svg)
:::

### 3.2

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis tristique sollicitudin nibh sit amet commodo nulla. Sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. Quis eleifend quam adipiscing vitae proin sagittis.[^1] Dignissim diam quis enim lobortis scelerisque fermentum dui.[^2] Lacus laoreet non curabitur gravida arcu ac. Tortor at risus viverra adipiscing at in. Purus faucibus ornare suspendisse sed nisi lacus sed. Nisl suscipit adipiscing bibendum est ultricies integer quis. Volutpat ac tincidunt vitae semper quis lectus. Nisl suscipit adipiscing bibendum est ultricies integer quis.

[^1]: Here's my first inline note
[^2]: Here's another inline note that spans many lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis tristique sollicitudin nibh sit amet commodo nulla.

#### 3.2.1

yay

# lorem

## ipsum

### dolor

## sit

### amet

# consectetur

## adipiscing

### elit

## sed do

# eiusmod

## tempor

# incididunt

## ut labore et

# Duis

## tristique

# sollicitudin

## nibh sit amet

## commodo nulla

## nisl suscipit

## adipiscing bibendum