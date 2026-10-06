#!/usr/bin/env bash
# Rebuilds public/fonts from design-system/fonts.
# Requires: pip install fonttools brotli
#
# The design-system Archivo and IBM Plex Sans files are variable fonts (one file
# for every weight), so we clamp each to the weight range the site uses and ship
# one file per family. Plex Mono ships as two static weights.
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=design-system/fonts
OUT=public/fonts
TMP=$(mktemp -d)
mkdir -p "$OUT"

# Basic Latin + Latin-1 + general punctuation (curly quotes, middle dot, ellipsis).
LATIN="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2013-2014,U+2018-201A,U+201C-201E,U+2022,U+2026,U+2039-203A,U+20AC,U+2122,U+2192"

instance() { # src, out, range
  fonttools varLib.instancer "$1" "wght=$3" -o "$2" -q
}
subset() { # src, out
  pyftsubset "$1" --unicodes="$LATIN" --flavor=woff2 --layout-features='kern,liga,tnum,pnum' \
    --no-hinting --desubroutinize --output-file="$2"
}

instance "$SRC/Archivo-variable.woff2" "$TMP/archivo.ttf" 700:800
instance "$SRC/IBMPlexSans-variable.woff2" "$TMP/plex-sans.ttf" 400:600
subset "$TMP/archivo.ttf" "$OUT/archivo-700-800.woff2"
subset "$TMP/plex-sans.ttf" "$OUT/plex-sans-400-600.woff2"
subset "$SRC/IBMPlexMono-400.woff2" "$OUT/plex-mono-400.woff2"
subset "$SRC/IBMPlexMono-500.woff2" "$OUT/plex-mono-500.woff2"

rm -rf "$TMP"
ls -l "$OUT"
