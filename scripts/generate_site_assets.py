#!/usr/bin/env python3
from __future__ import annotations

import re
from datetime import date
from pathlib import Path
from textwrap import wrap
from xml.sax.saxutils import escape

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public"
BLOG_DIR = PUBLIC_DIR / "blog" / "posts"
PROJECTS_DIR = PUBLIC_DIR / "projects"
TODAY = date.today().isoformat()
BASE_URL = "https://prithivraj.xyz"

PROJECTS = [
    {
        "slug": "openpipe",
        "title": "OpenPipe",
        "eyebrow": "Streaming Data Platform",
        "summary": "Kafka, Flink, TimescaleDB, and FastAPI wired into one local event-streaming playground.",
        "tech": ["Python", "Kafka", "PyFlink", "TimescaleDB", "FastAPI", "Docker"],
        "image": "openpipe-card.jpg",
        "accent": (9, 64, 146),
    },
    {
        "slug": "pixel-desktop-remastered",
        "title": "Pixel Desktop Remastered",
        "eyebrow": "Retro Personal Site",
        "summary": "A Windows 95 shell paired with a cleaner reading mode for writing, case studies, and search visibility.",
        "tech": ["React", "TypeScript", "Vite", "Tailwind CSS", "SEO"],
        "image": "pixel-desktop-remastered-card.jpg",
        "accent": (46, 84, 62),
    },
    {
        "slug": "pdfinvoicer",
        "title": "PDF Invoicer",
        "eyebrow": "Offline GST Invoice System",
        "summary": "A privacy-first invoice generator built for local durability, GST flows, and optional backup.",
        "tech": ["React", "TypeScript", "IndexedDB", "Firebase", "PWA", "jsPDF"],
        "image": "pdfinvoicer-card.jpg",
        "accent": (120, 74, 18),
    },
]


def load_font(size: int, bold: bool = False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for candidate in candidates:
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


FONT_H1 = load_font(60, bold=True)
FONT_H2 = load_font(34, bold=True)
FONT_H3 = load_font(24, bold=True)
FONT_BODY = load_font(22)
FONT_SMALL = load_font(18, bold=True)


def slugify(text: str) -> str:
    return re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", text.lower()))


def parse_frontmatter(markdown_text: str):
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", markdown_text, re.S)
    if not match:
        return {}, markdown_text
    frontmatter_text, content = match.groups()
    frontmatter = {}
    for line in frontmatter_text.splitlines():
      if ":" not in line:
        continue
      key, value = line.split(":", 1)
      value = value.strip().strip('"').strip("'")
      frontmatter[key.strip()] = value
    return frontmatter, content.strip()


def load_posts():
    posts = []
    for path in sorted(BLOG_DIR.glob("*.md")):
        frontmatter, content = parse_frontmatter(path.read_text(encoding="utf-8"))
        title = frontmatter.get("title", path.stem)
        post = {
            "id": frontmatter.get("id", path.stem),
            "title": title,
            "date": frontmatter.get("date", TODAY),
            "preview": frontmatter.get("preview", content[:160] + "..."),
            "slug": slugify(title),
            "content": content,
        }
        posts.append(post)
    posts.sort(key=lambda post: post["date"], reverse=True)
    return posts


def write_rss(posts):
    items = []
    for post in posts:
        items.append(
            f"""  <item>
    <title>{escape(post['title'])}</title>
    <link>{BASE_URL}/blog/{post['slug']}</link>
    <guid>{BASE_URL}/blog/{post['slug']}</guid>
    <pubDate>{post['date']}</pubDate>
    <description>{escape(post['preview'])}</description>
  </item>"""
        )

    rss = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Prithiv Raj Writing</title>
  <link>{BASE_URL}</link>
  <description>Writing on data systems, internal software, architecture, and applied engineering.</description>
  <language>en-us</language>
  <lastBuildDate>{posts[0]['date'] if posts else TODAY}</lastBuildDate>
{chr(10).join(items)}
</channel>
</rss>
"""
    (PUBLIC_DIR / "rss.xml").write_text(rss, encoding="utf-8")


def write_sitemap(posts):
    urls = [
        ("{}/".format(BASE_URL), TODAY, "weekly", "1.0"),
        ("{}/blog".format(BASE_URL), posts[0]["date"] if posts else TODAY, "weekly", "0.9"),
    ]
    for project in PROJECTS:
        urls.append((f"{BASE_URL}/projects/{project['slug']}", TODAY, "monthly", "0.8"))
    for post in posts:
        urls.append((f"{BASE_URL}/blog/{post['slug']}", post["date"], "monthly", "0.8"))

    body = "\n".join(
        f"""  <url>
    <loc>{escape(loc)}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>{changefreq}</changefreq>
    <priority>{priority}</priority>
  </url>"""
        for loc, lastmod, changefreq, priority in urls
    )
    sitemap = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{body}
</urlset>
"""
    (PUBLIC_DIR / "sitemap.xml").write_text(sitemap, encoding="utf-8")


def draw_gradient(draw: ImageDraw.ImageDraw, width: int, height: int, start, end):
    for y in range(height):
        ratio = y / max(height - 1, 1)
        color = tuple(int(start[i] + (end[i] - start[i]) * ratio) for i in range(3))
        draw.line([(0, y), (width, y)], fill=color)


def draw_chip(draw, x, y, text, fill, text_fill):
    text_width = draw.textbbox((0, 0), text, font=FONT_SMALL)[2]
    draw.rounded_rectangle((x, y, x + text_width + 28, y + 34), radius=10, fill=fill)
    draw.text((x + 14, y + 7), text, font=FONT_SMALL, fill=text_fill)
    return x + text_width + 40


def write_wrapped(draw, x, y, text, font, fill, width_chars, line_gap):
    current_y = y
    for line in wrap(text, width_chars):
        draw.text((x, current_y), line, font=font, fill=fill)
        current_y += font.size + line_gap
    return current_y


def render_og_image():
    image = Image.new("RGB", (1200, 630), (242, 238, 231))
    draw = ImageDraw.Draw(image)
    draw_gradient(draw, 1200, 630, (244, 239, 226), (223, 216, 206))

    draw.rounded_rectangle((52, 50, 1148, 580), radius=28, fill=(15, 23, 42), outline=(0, 0, 0), width=4)
    draw.rounded_rectangle((84, 84, 710, 546), radius=20, fill=(248, 250, 252))
    draw.rounded_rectangle((742, 84, 1116, 546), radius=20, fill=(202, 211, 225))
    draw.rectangle((742, 84, 1116, 128), fill=(0, 0, 128))
    draw.text((764, 96), "Prithiv Raj.exe", font=FONT_SMALL, fill=(255, 255, 255))

    profile_path = PUBLIC_DIR / "icons" / "profile_prithiv.png"
    if profile_path.exists():
        profile = Image.open(profile_path).convert("RGBA").resize((244, 244))
        image.paste(profile, (804, 158))

    draw.text((116, 126), "Prithiv Raj", font=FONT_H1, fill=(17, 24, 39))
    draw.text((116, 210), "Data Architect and Senior Data Engineer", font=FONT_H3, fill=(55, 65, 81))
    body_y = write_wrapped(
        draw,
        116,
        280,
        "Designing data platforms, internal software, and AI-enabled systems with a bias for architecture, operations, and delivery.",
        FONT_BODY,
        (55, 65, 81),
        34,
        10,
    )

    chip_x = 116
    for chip in ["Data Platforms", "Internal Software", "AI Systems"]:
        chip_x = draw_chip(draw, chip_x, body_y + 24, chip, (0, 0, 128), (255, 255, 255))

    image.save(PUBLIC_DIR / "og-image.jpg", quality=92)


def render_project_cards():
    PROJECTS_DIR.mkdir(parents=True, exist_ok=True)
    for project in PROJECTS:
        image = Image.new("RGB", (1200, 630), (247, 244, 238))
        draw = ImageDraw.Draw(image)
        accent = project["accent"]
        draw_gradient(draw, 1200, 630, (246, 241, 232), tuple(min(255, c + 90) for c in accent))

        draw.rounded_rectangle((48, 48, 1152, 582), radius=28, fill=(248, 250, 252), outline=(17, 24, 39), width=4)
        draw.rectangle((48, 48, 1152, 104), fill=accent)
        draw.text((76, 64), project["title"], font=FONT_H3, fill=(255, 255, 255))
        draw.text((76, 126), project["eyebrow"], font=FONT_SMALL, fill=(75, 85, 99))
        draw.text((76, 166), "Build Notes", font=FONT_H2, fill=(17, 24, 39))
        text_end = write_wrapped(draw, 76, 228, project["summary"], FONT_BODY, (55, 65, 81), 40, 10)

        chip_x = 76
        chip_y = text_end + 26
        for tech in project["tech"][:4]:
            chip_x = draw_chip(draw, chip_x, chip_y, tech, accent, (255, 255, 255))

        panel_x1, panel_y1, panel_x2, panel_y2 = 720, 146, 1092, 516
        draw.rounded_rectangle((panel_x1, panel_y1, panel_x2, panel_y2), radius=18, fill=(15, 23, 42))
        draw.rectangle((panel_x1, panel_y1, panel_x2, panel_y1 + 36), fill=(22, 30, 55))
        draw.text((panel_x1 + 18, panel_y1 + 7), project["slug"], font=FONT_SMALL, fill=(255, 255, 255))
        for idx, row in enumerate(project["tech"][:5]):
            y = panel_y1 + 74 + idx * 56
            draw.rounded_rectangle((panel_x1 + 24, y, panel_x2 - 24, y + 38), radius=10, fill=accent)
            draw.text((panel_x1 + 42, y + 7), row, font=FONT_SMALL, fill=(255, 255, 255))

        image.save(PROJECTS_DIR / project["image"], quality=92)


def main():
    posts = load_posts()
    write_rss(posts)
    write_sitemap(posts)
    render_og_image()
    render_project_cards()
    print("Generated rss.xml, sitemap.xml, og-image.jpg, and project cards.")


if __name__ == "__main__":
    main()
