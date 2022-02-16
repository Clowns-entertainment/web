#!/usr/bin/env python
import sys
import json
import getopt
import os.path
import subprocess
from collections import OrderedDict

try:
    opts, languages = getopt.getopt(sys.argv[1:], "o:", ["output="])
except getopt.GetoptError as err:
    print(err)
    sys.exit(2)

output = os.path.join(os.path.dirname(__file__), 'i18n')
for opt, value in opts:
    if opt in ("-o", "--output"):
        output = value

for lang in languages:
    merged_path = f"{output}/{lang}.json"
    plain_path = f"{output}/plain/{lang}.json"
    subprocess.run(["formatjs", "extract", "src/**/*.ts*", "--ignore=src/**/*.d.ts",
                    "--out-file", plain_path,
                    "--id-interpolation-pattern", "[sha512:contenthash:base64:6]"])
    merged = OrderedDict()
    try:
        with open(merged_path) as file:
            merged = OrderedDict(json.load(file))
    except FileNotFoundError:
        pass
    with open(plain_path) as file:
        plain = json.load(file)
    removed = set(merged) - set(plain)
    added =  set(plain) - set(merged)
    removed_path = merged_path.replace('.json', '-.json')
    removed = dict((key, value) for key, value in merged.items() if key in removed)
    if removed:
        with open(removed_path, "w") as file:
            json.dump(removed, file, ensure_ascii=False, indent="  ")
    elif os.path.exists(removed_path):
        os.remove(removed_path)
    merged = dict((key, value) for key, value in merged.items() if key not in removed)
    merged.update(dict((key, value) for key, value in plain.items() if key in added))
    with open(merged_path, "w") as file:
        json.dump(merged, file, ensure_ascii=False, indent="  ")
