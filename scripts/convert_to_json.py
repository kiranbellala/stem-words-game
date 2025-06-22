#!/usr/bin/env python3
import json
import re

def parse_stem_words(file_path):
    with open(file_path, 'r') as file:
        content = file.read()
    
    # Split the content by list numbers
    lists = re.split(r'The Word Within the Word – List #\d+', content)
    lists = [lst.strip() for lst in lists if lst.strip()]
    
    all_stems = []
    list_number = 1
    
    for lst in lists:
        lines = lst.split('\n')
        lines = [line.strip() for line in lines if line.strip()]
        
        # Skip header line if it exists
        start_idx = 1 if lines[0].startswith('Root') else 0
        
        for i in range(start_idx, len(lines)):
            line = lines[i]
            # Extract stem, definition, examples, and origin using regex
            match = re.match(r'^(\w+)\s+(\w+)\s+(.*?)\s{2,}(\w+)$', line)
            if match:
                stem, definition, examples_str, origin = match.groups()
                examples = [ex.strip() for ex in examples_str.split(',')]
                
                stem_entry = {
                    "list": list_number,
                    "stem": stem.strip(),
                    "definition": definition.strip(),
                    "examples": examples,
                    "origin": origin.strip()
                }
                all_stems.append(stem_entry)
        
        list_number += 1
    
    return all_stems

def main():
    stems = parse_stem_words('./stem_words_raw.txt')
    
    # Write to JSON file
    with open('stem_words.json', 'w') as json_file:
        json.dump({"stems": stems}, json_file, indent=2)
    
    print(f"Converted {len(stems)} stem words to JSON format.")

if __name__ == "__main__":
    main()
