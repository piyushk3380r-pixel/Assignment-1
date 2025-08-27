Assignment 1 – Next.js + Bootstrap Tabs Builder

This is a Next.js 15 + TypeScript + Bootstrap application created using create-next-app.  
It was built as part of an assignment to demonstrate routing, reusable layouts, and dynamic tab functionality.

---

Features

- Next.js 15 + TypeScript
- Bootstrap 5 styling for layout and UI
- Common Header and Footer across all pages
- Pages:
  - Home
  - About (includes student name, student number, and a video embed)
  - Tabs Page (main functionality)

Tabs Page
- Add up to 15 dynamic tabs  
  - If the limit is reached → popup alert ("tab limit of 15 is reached. cannot add more.")
- Edit tab title, content, and content mode:
  - Paragraphs (<p>)  
  - Table (<table>, rows separated by newlines, columns by |)
- Delete tabs (at least 1 remains)
- Persistent tabs using localStorage (saved across reloads)
- Unique tab IDs (no duplicate React keys, hydration-safe)
- Generate HTML Output:
  - Button → Output & Copy to Clipboard
  - Creates a complete standalone HTML document with:
   - <!DOCTYPE html>
    - <html> <head><title></title> <body>…</body> </html>
    - Inline CSS only (no <style> tags, no CSS classes)
- Light/Dark theme toggle:
  - Default = Light (white background, dark text)
  - Dark = Dark background, light text

---

Tech Stack used

- [Next.js 15 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Bootstrap 5](https://getbootstrap.com/)

---

Installation & Setup

1. Clone this repo
   bash
   git clone https://github.com/<piyushk3380r-pixel>/assignment-1.git
   cd assignment1
