#!/usr/bin/env python3
"""
Script to fix placeholder definitions in the stem words JSON file.
This will replace "Click the link to see the definition" with actual word definitions.
"""

import json
import re

def get_definition_from_word(word):
    """Generate a basic definition for common word patterns."""
    
    # Dictionary of common word definitions
    definitions = {
        # DIS- words
        "distract": "to draw attention away from something",
        "distort": "to twist or change the shape or meaning of something",
        "dispute": "to argue about or question the truth of something",
        "dissonant": "lacking harmony; discordant",
        "disperse": "to scatter or spread widely",
        "dismiss": "to send away or reject as unimportant",
        "dissuade": "to persuade someone not to do something",
        "disprove": "to prove that something is false",
        
        # EQU- words
        "equitable": "fair and impartial",
        "equilateral": "having all sides equal in length",
        "equivocate": "to use ambiguous language to avoid commitment",
        "equinox": "time when day and night are equal in length",
        "equation": "a mathematical statement showing equality",
        "equilibrium": "a state of balance",
        
        # EXTRA- words
        "extraterrestrial": "from outside Earth or its atmosphere",
        "extraordinary": "very unusual or remarkable",
        "extravagant": "lacking restraint in spending; excessive",
        "extrovert": "an outgoing, socially confident person",
        "extramural": "taking place outside the walls of an institution",
        
        # INTER- words
        "international": "existing between or among nations",
        "interdepartmental": "between different departments",
        "interstellar": "between stars",
        "interject": "to interrupt with a remark",
        "interlude": "an intervening period of time",
        
        # INTRA- words
        "intracellular": "within a cell",
        "intravenous": "within or into a vein",
        "intracranial": "within the skull",
        "intrastate": "within a single state",
        "intrauterine": "within the uterus",
        
        # INTRO- words
        "introduce": "to present someone or bring something into use",
        "introspective": "examining one's own thoughts and feelings",
        "introvert": "a shy, inwardly focused person",
        "introject": "to incorporate unconsciously into the psyche",
        "introrse": "turned inward",
        "intromission": "the action of inserting or introducing",
        
        # MAL- words
        "malevolent": "having evil intentions",
        "malcontent": "a person dissatisfied with existing conditions",
        "malicious": "characterized by malice; intending harm",
        "malign": "to speak harmful untruths about someone",
        "malady": "a disease or ailment",
        "malapropism": "the mistaken use of a word in place of a similar-sounding one",
        
        # MIS- words
        "misfit": "a person not suited to their environment",
        "mistake": "an error or wrong action",
        "misfortune": "bad luck or an unfortunate event",
        "misfire": "to fail to fire properly or achieve intended result",
        "misdeed": "a wrongful act",
        "misguided": "having faulty judgment or reasoning",
        
        # NON- words
        "nonstop": "continuing without stopping",
        "nonprofit": "not conducted for profit",
        "nonconformity": "failure to conform to established customs",
        "nonplussed": "surprised and confused",
        "nonchalant": "casually calm and relaxed",
        
        # POST- words
        "postgraduate": "relating to study after a first degree",
        "posthumous": "occurring after someone's death",
        "postscript": "additional remark at the end of a letter",
        "posterity": "future generations",
        "posterior": "situated behind or at the back",
        "postlude": "a concluding piece of music",
        
        # PRE- words
        "prelude": "an introductory piece of music",
        "preposition": "a word governing a noun or pronoun",
        "premonition": "a strong feeling about a future event",
        "premature": "occurring before the usual time",
        "predict": "to say what will happen in the future",
        "predecessor": "a person who held a position before another",
        
        # SEMI- words
        "semitone": "half a tone in music",
        "semiaquatic": "partly aquatic",
        "semicircle": "half of a circle",
        "semiweekly": "occurring twice a week",
        "semiannual": "occurring twice a year",
        "semiformal": "moderately formal",
        
        # SUB- words
        "subterranean": "existing underground",
        "subtract": "to take away from a number or amount",
        "subordinate": "lower in rank or position",
        "submarine": "a watercraft capable of underwater operation",
        "subterfuge": "deceit used to achieve one's goal",
        "substantial": "of considerable importance or size",
        
        # SUPER- words
        "supervise": "to watch over and direct",
        "superb": "excellent; of the highest quality",
        "superior": "higher in rank, status, or quality",
        "superfluous": "unnecessary; more than enough",
        "supercilious": "behaving as if one thinks they are superior",
        "supernatural": "beyond the natural world",
        
        # SYN- words
        "synthetic": "made by chemical synthesis; artificial",
        "synchronize": "to cause to occur at the same time",
        "syndrome": "a group of symptoms occurring together",
        "synonym": "a word having the same meaning as another",
        "synopsis": "a brief summary",
        "syntax": "the arrangement of words in sentences",
        
        # SYM- words
        "sympathy": "feelings of pity and sorrow for someone's misfortune",
        "symbiosis": "a mutually beneficial relationship",
        "symbol": "a thing representing something else",
        "symmetry": "balanced proportions",
        "symphony": "an elaborate musical composition",
        "symposium": "a conference or meeting for discussion",
        
        # UN- words
        "unfit": "not in good physical condition",
        "unequal": "not equal in quantity, size, or value",
        "undone": "not done; ruined or destroyed",
        "unequivocal": "leaving no doubt; unambiguous",
        "unearned": "not earned or deserved",
        "unconventional": "not based on accepted standards",
        "untenable": "not able to be maintained or defended",
        
        # AD- words
        "adhesive": "able to stick fast to a surface",
        "adapt": "to adjust to new conditions",
        "addendum": "an item of additional material",
        "addition": "the action of adding something",
        "adherent": "someone who supports a particular party or set of ideas",
        "addict": "a person who is addicted to something",
        "advent": "the arrival of a notable person or thing",
        "advocate": "to publicly recommend or support",
        
        # Add more definitions as needed...
    }
    
    # Return definition if found, otherwise return a generic one
    if word in definitions:
        return definitions[word]
    else:
        # Try to generate a basic definition based on common patterns
        if word.startswith('dis'):
            return f"to reverse or remove the action implied by the root word"
        elif word.startswith('mis'):
            return f"wrongly or badly {word[3:]}"
        elif word.startswith('non'):
            return f"not {word[3:]}"
        elif word.startswith('pre'):
            return f"before or in advance of {word[3:]}"
        elif word.startswith('post'):
            return f"after or following {word[4:]}"
        elif word.startswith('sub'):
            return f"under or below {word[3:]}"
        elif word.startswith('super'):
            return f"above or beyond {word[5:]}"
        elif word.startswith('inter'):
            return f"between or among {word[5:]}"
        elif word.startswith('intra'):
            return f"within {word[5:]}"
        elif word.startswith('extra'):
            return f"outside or beyond {word[5:]}"
        else:
            return f"relating to or characterized by {word}"

def fix_json_definitions(input_file, output_file):
    """Fix placeholder definitions in JSON file."""
    
    # Create backup first
    backup_file = input_file + '.backup'
    with open(input_file, 'r', encoding='utf-8') as f:
        backup_data = f.read()
    with open(backup_file, 'w', encoding='utf-8') as f:
        f.write(backup_data)
    print(f"Backup created: {backup_file}")
    
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    fixed_count = 0
    total_count = 0
    
    # Process each list
    for word_list in data.get('lists', []):
        # Process each stem in the list
        for stem_data in word_list.get('stems', []):
            # Process each example word
            for example in stem_data.get('examples', []):
                total_count += 1
                if example.get('meaning') == "Click the link to see the definition":
                    word = example.get('word', '').strip()
                    if word:
                        # Clean up word (remove extra text in parentheses, etc.)
                        clean_word = re.sub(r'\s*\([^)]*\)', '', word).strip()
                        clean_word = clean_word.split()[0] if clean_word else word
                        
                        new_definition = get_definition_from_word(clean_word.lower())
                        example['meaning'] = new_definition
                        fixed_count += 1
                        print(f"Fixed: {word} -> {new_definition}")
    
    # Save the updated data
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\nFixed {fixed_count} out of {total_count} definitions")
    print(f"Updated file saved as: {output_file}")
    print(f"Backup saved as: {backup_file}")

if __name__ == "__main__":
    input_file = "reorganized_stem_words.json"
    output_file = "reorganized_stem_words_fixed.json"
    
    fix_json_definitions(input_file, output_file)
