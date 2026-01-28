# GoHome-Browser-Extension
A bowser extension that navigates to the current tab's second-level domain. i.e. it goes to the "home" domain.

## What problem does this solve?

A web search takes me to the documentation for an API I'm researching. e.g. [https://docs.stripe.com/api](https://docs.stripe.com/api).

Most developer portals and other "secondary" websites live at sub-domains and don't include an obvious link back to the main website.

Example: See [Stripe's developer portal](https://docs.stripe.com/api). None of the links in the header go to [stripe.com](https://stripe.com).

I usually end up doing some version of a copy/edit/paste dance...

1. Jump to navigation bar.
2. Remove the path https://docs.stripe.com/api → https://docs.stripe.com
3. Remove the sub-domain https://docs.stripe.com → https://stripe.com
4. Press `return` and hope I didn't make a typo.

This browser extension, when clicked, automaticaly removes the path and any query params and navigates to the "real" home page.

## Caveats

- I made this with Claude in about 5 minutes.
- There's some special casing needed. For example, `https://bar.foo.co.uk` needs to go to `https://foo.co.uk` _not_ `https://co.uk`. Pull requests are welcome if there's a better fix I'm not aware of.
- Tested in Chromium browsers. Not yet tested in Firefox or Safari. I'm a bad web citizen, I'm sorry.

