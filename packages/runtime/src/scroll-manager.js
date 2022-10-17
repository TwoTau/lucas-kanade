export function scrollManager(root) {
  let stickys = [...root.querySelectorAll('.sticky')].map((sticky) => ({
    sticky,
    inMargin: sticky.classList.contains('margin'),
    end:
      root.querySelector(sticky.getAttribute('sticky-through')) ||
      root.querySelector(sticky.getAttribute('sticky-until')),
    untilBottom: sticky.getAttribute('sticky-through') != null,
  }));

  // Remove sticky elements where anchors don't exist
  for (const { sticky } of stickys.filter(({ end }) => !end)) {
    console.log(sticky, 'Could not find sticky anchor ' + (sticky.getAttribute('sticky-through') || sticky.getAttribute('sticky-until')));
    sticky.classList.remove('sticky');
  }
  stickys = stickys.filter(({ end }) => end);

  function onScrollSticky() {
    let intersections = []; // starting and ending positions of each sticky element
    // allow side-by-side sticky elements if larger screen and one is in the margin and the other is not
    const isDesktop = !window.matchMedia('(max-width: 1100px)').matches;

    for (const { sticky, inMargin, end, untilBottom } of stickys) {
      if (!end) {
        continue;
      }
      // getBoundingClientRect has sub-pixel precision unlike offsetTop
      const stickyRect = sticky.getBoundingClientRect();
      // un-account for existing translation and scroll
      const stickyOffsetTop = stickyRect.top
        + window.scrollY
        - +sticky.style.transform.slice('translateY('.length, -'px)'.length);

      let endY = end.offsetTop;
      if (untilBottom) {
        // account for height of end element
        endY += end.offsetHeight;
      }
      let dy = endY - (stickyOffsetTop + stickyRect.height);
      dy = Math.min(0, dy);

      // stack element if necessary
      let top = stickyOffsetTop + dy;
      let bottom = top + stickyRect.height;
      for (const [iTop, iBottom, iInMargin] of intersections) {
        if (
          (isDesktop && inMargin != iInMargin) ||
          bottom <= iTop ||
          top >= iBottom
        ) {
          continue;
        }

        let ddy = Math.max(0, iBottom + stickyRect.height - endY);
        dy = iBottom - stickyOffsetTop - ddy;
        top = iBottom - ddy;
        bottom = top + stickyRect.height;
        sticky.style.setProperty('z-index', 1); // beneath other stickys
      }
      intersections.push([top, bottom, inMargin]);
      sticky.style.setProperty('transform', `translateY(${dy}px)`);
    }
  }

  const menuLinks = [];
  const targets = [];
  for (const link of document.querySelectorAll('table-of-contents a')) {
    const target = document.getElementById(link.hash.slice(1));
    if (target) {
      const parents = [link.parentNode]; // <li> parents
      let li;
      do {
        li = parents[parents.length - 1].parentNode.closest('li');
        if (!li) {
          break;
        }
        parents.push(li);
      } while (li);
      link.parents = parents;

      menuLinks.push(link);
      targets.push(target);
    } else {
      // Remove <a> tag
      link.outerHTML = link.innerHTML;
    }
  }
  targets.reverse();

  const targetMargin = 10;
  let activeIndex = -1;
	let currentParent = null;

  function onScrollTableOfContents() {
    const current = targets.length - targets.findIndex((target) => window.scrollY >= target.offsetTop - targetMargin) - 1;

		if (current !== activeIndex) {
			if (currentParent) {
				currentParent.classList.remove('active');
        for (const parent of document.querySelectorAll('.active-parent')) {
          parent.classList.remove('active-parent');
        }
			}
			activeIndex = current;
			if (menuLinks[current]) {
				currentParent = menuLinks[current].parentElement;
				currentParent.classList.add('active');

        for (const parent of menuLinks[current].parents) {
          parent.classList.add('active-parent');
        }
			}
		}
  }

  window.addEventListener('scroll', () => {
    onScrollSticky();
    onScrollTableOfContents();
  }, { passive: true });
}
