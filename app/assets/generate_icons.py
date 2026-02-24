#!/usr/bin/env python3
"""Generate GitGael icon assets from scratch using Pillow.

Creates: icon.png (512x512), icon.ico, and multi-size PNGs in icons/.
The design matches icon.svg: emerald diamond/crystal on dark rounded-rect background.
"""
from pathlib import Path

from PIL import Image, ImageDraw

SIZES = [16, 32, 48, 128, 256, 512]
BASE = Path(__file__).parent



def draw_icon(size):
    """Draw the GitGael icon at a given size."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Scale factor
    s = size / 512.0

    # Rounded rectangle background (#111827 to #1f2937)
    bg_color = (17, 24, 39, 255)
    margin = int(16 * s)
    corner = int(96 * s)
    draw.rounded_rectangle(
        [margin, margin, size - margin, size - margin],
        radius=corner,
        fill=bg_color,
    )

    # Diamond points (scaled)
    top = (int(256 * s), int(80 * s))
    left = (int(128 * s), int(200 * s))
    mid_left = (int(168 * s), int(200 * s))
    mid_right = (int(344 * s), int(200 * s))
    right = (int(384 * s), int(200 * s))
    bottom = (int(256 * s), int(420 * s))
    center = (int(256 * s), int(200 * s))

    # Crown (top triangle) - bright emerald
    draw.polygon([top, left, right], fill=(16, 185, 129, 255))

    # Left outer facet - darker green
    draw.polygon([top, left, mid_left], fill=(110, 231, 183, 70))

    # Right outer facet
    draw.polygon([top, mid_right, right], fill=(16, 185, 129, 50))

    # Crown line (belt)
    draw.line([left, right], fill=(110, 231, 183, 140), width=max(1, int(2 * s)))

    # Bottom left facet - medium emerald
    draw.polygon([left, mid_left, bottom], fill=(5, 150, 105, 180))

    # Bottom center-left facet
    draw.polygon([mid_left, center, bottom], fill=(52, 211, 153, 160))

    # Bottom center-right facet
    draw.polygon([center, mid_right, bottom], fill=(4, 120, 87, 200))

    # Bottom right facet
    draw.polygon([mid_right, right, bottom], fill=(4, 120, 87, 170))

    # Top highlight
    highlight_pts = [
        top,
        (int(200 * s), int(170 * s)),
        (int(256 * s), int(160 * s)),
    ]
    draw.polygon(highlight_pts, fill=(255, 255, 255, 55))

    return img


def main():
    # Generate 512x512 master icon
    master = draw_icon(512)
    master.save(BASE / "icon.png", "PNG")
    print("Created icon.png (512x512)")

    # Generate multi-size PNGs
    icons_dir = BASE / "icons"
    icons_dir.mkdir(exist_ok=True)
    for sz in SIZES:
        if sz == 512:
            master.save(icons_dir / f"{sz}x{sz}.png", "PNG")
        else:
            resized = master.resize((sz, sz), Image.LANCZOS)
            resized.save(icons_dir / f"{sz}x{sz}.png", "PNG")
        print(f"Created icons/{sz}x{sz}.png")

    # Generate ICO (Windows) - Pillow's ICO save auto-resizes from source
    ico_sizes = [(sz, sz) for sz in SIZES if sz <= 256]
    master.save(BASE / "icon.ico", format="ICO", sizes=ico_sizes)
    print("Created icon.ico")

    print("Done! All icon assets generated.")


if __name__ == "__main__":
    main()
