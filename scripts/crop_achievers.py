"""Compatibility entry point; use the current hyphenated crop script."""
from pathlib import Path
import runpy

runpy.run_path(str(Path(__file__).with_name("crop-achievers.py")), run_name="__main__")
