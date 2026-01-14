
# -- Project information -----------------------------------------------------

project = 'ska-dataproduct-dashboard'
copyright = '2024, SKAO'
author = 'SKAO'

# The short X.Y version
version = '0.15.0'
# The full version, including alpha/beta/rc tags
release = '0.15.0'

# -- General configuration ---------------------------------------------------

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.doctest',
    'sphinx.ext.intersphinx',
    'sphinx.ext.todo',
    'sphinx.ext.coverage',
    'sphinx.ext.mathjax',
    'sphinx.ext.ifconfig',
    'sphinx.ext.viewcode',
    'sphinx.ext.autosectionlabel',
    'sphinx_copybutton',
    'sphinx_new_tab_link',
    'recommonmark',
]

templates_path = ['_templates']

source_suffix = ['.rst', '.md']

master_doc = 'index'

exclude_patterns = []

pygments_style = 'sphinx'

# -- Options for HTML output -------------------------------------------------

html_theme = 'ska_ser_sphinx_theme'

html_context = {}

html_static_path = ['_static']

# -- Options for HTMLHelp output ---------------------------------------------

htmlhelp_basename = 'ska-dataproduct-dashboard'

# -- Options for LaTeX output ------------------------------------------------

latex_elements = {}

latex_documents = [
    (master_doc, 'ska-dataproduct-dashboard.tex', 'ska-dataproduct-dashboard Documentation',
     'SKAO', 'manual'),
]

# -- Options for manual page output ------------------------------------------

man_pages = [
    (master_doc, 'ska-dataproduct-dashboard', 'ska-dataproduct-dashboard Documentation',
     [author], 1)
]

# -- Options for Texinfo output ----------------------------------------------

texinfo_documents = [
    (master_doc, 'ska-dataproduct-dashboard', 'ska-dataproduct-dashboard Documentation',
     author, 'ska-dataproduct-dashboard', 'One line description of project.',
     'Miscellaneous'),
]

# -- Options for Epub output -------------------------------------------------

epub_title = project

epub_exclude_files = ['search.html']

# -- Extension configuration -------------------------------------------------

# -- Options for intersphinx extension ---------------------------------------

intersphinx_mapping = {}

# -- Options for todo extension ----------------------------------------------

todo_include_todos = True