#!/bin/bash
print_tree() {
    local prefix="$1"
    local dir="$2"
    for entry in "$dir"/*; do
        if [[ -d "$entry" ]]; then
            echo "${prefix}├── $(basename "$entry")/"
            print_tree "${prefix}│   " "$entry"
        elif [[ -f "$entry" ]]; then
            echo "${prefix}├── $(basename "$entry")"
        fi
    done
}

# List files in the current directory
for file in *; do
    if [[ -f "$file" ]]; then
        echo "├── $file"
    fi
done

# List directories and their contents
for d in */; do
    if [[ "${d}" != "node_modules/" && "${d}" != "pool/" ]]; then
        echo "$(basename "$d")/"
        print_tree "    " "${d%/}"
        echo
    fi
done