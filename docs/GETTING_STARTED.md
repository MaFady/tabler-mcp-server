# Getting Started with tabler-mcp-server

> A task-by-task walkthrough to test every capability of the server in a fresh AI conversation.
> 🇫🇷 [Version française ci-dessous](#-guide-de-démarrage--version-française)

---

## 🟦 TASK 0 — Install (once, 30 seconds)

**Step 0.1** — Open a terminal and paste:

```bash
claude mcp add tabler -- npx -y tabler-mcp-server
```

> Other MCP clients (Claude Desktop, Cursor, Windsurf, VS Code): add this to your MCP config:
>
> ```json
> {
>   "mcpServers": {
>     "tabler": { "command": "npx", "args": ["-y", "tabler-mcp-server"] }
>   }
> }
> ```

**Step 0.2** — Verify the connection:

```bash
claude mcp list
```

✅ Expected: `tabler: ... - ✔ Connected`

---

## 🟦 TASK 1 — Check that Claude sees the server

**Step 1.1** — Open a **new conversation** in Claude Code.

**Step 1.2** — Type:

```
/mcp
```

✅ Expected: the `tabler` server appears with its 12 tools.

---

## 🟦 TASK 2 — First contact: icons (the instant "wow")

**Step 2.1** — Paste this prompt:

```
Find Tabler icons for an invoicing app (invoices, payments, customers)
```

✅ Expected: Claude calls `tabler:search_icons` and lists real icon names (`file-invoice`, `credit-card`, `users`…) with tags and categories.

**Step 2.2** — Follow up with:

```
Give me file-invoice as a React component, then as a red 32px SVG
```

✅ Expected: two `tabler:get_icon` calls → React code (`IconFileInvoice`) + a customized SVG.

---

## 🟦 TASK 3 — UI components

**Step 3.1**:

```
Which Tabler components exist for displaying data?
```

✅ Expected: `tabler:list_components` call → tables, datagrid, cards…

**Step 3.2**:

```
Give me the exact markup of a Tabler card with a "New" ribbon and a progress bar
```

✅ Expected: `tabler:get_component` calls → canonical Tabler 1.4 HTML, zero invented class names.

---

## 🟦 TASK 4 — The exact color (the anti-hallucination test 😄)

**Step 4.1**:

```
What is the exact hex code of Tabler's danger color? And its CSS variable?
```

✅ Expected: `tabler:get_colors` call → `#d63939` / `--tblr-danger` (extracted from the real CSS, not guessed).

---

## 🟦 TASK 5 — Grand finale: a complete page

**Step 5.1**:

```
Build me a Tabler login page in dark mode for "Acme Cloud" and save it as login.html
```

✅ Expected: `tabler:get_page_layout` call → a complete HTML file is created.

**Step 5.2** — Double-click `login.html`.

✅ Expected: a professional, dark, perfectly styled sign-in page in your browser.

**Step 5.3** (bonus):

```
Now add a home dashboard with 4 stat cards and a users table
```

✅ Expected: Claude chains `search_icons` → `get_component` → `get_page_layout` on its own.

---

## 🟦 TASK 6 — Live documentation

**Step 6.1**:

```
Show me what the official Tabler docs say about form validation
```

✅ Expected: `tabler:search_docs` + `tabler:get_docs_page` calls → real content from docs.tabler.io.

---

## 📸 Sharing with the community

Great moments to screenshot:

1. **Task 2.1** — the `tabler:search_icons` tool-call block with its results (shows the product in action)
2. **Task 5.2** — the rendered login page in the browser (shows the result)
3. Both side by side = the perfect "prompt → tool → result" combo

---
---

# 🇫🇷 Guide de démarrage — version française

> Un parcours tâche par tâche pour tester toutes les capacités du serveur dans une nouvelle conversation IA.

---

## 🟦 TÂCHE 0 — Installation (une seule fois, 30 secondes)

**Étape 0.1** — Ouvrir un terminal et coller :

```bash
claude mcp add tabler -- npx -y tabler-mcp-server
```

> Autres clients MCP (Claude Desktop, Cursor, Windsurf, VS Code) : ajoutez ceci à votre configuration MCP :
>
> ```json
> {
>   "mcpServers": {
>     "tabler": { "command": "npx", "args": ["-y", "tabler-mcp-server"] }
>   }
> }
> ```

**Étape 0.2** — Vérifier la connexion :

```bash
claude mcp list
```

✅ Attendu : `tabler: ... - ✔ Connected`

---

## 🟦 TÂCHE 1 — Vérifier que Claude voit le serveur

**Étape 1.1** — Ouvrir une **nouvelle conversation** dans Claude Code.

**Étape 1.2** — Taper :

```
/mcp
```

✅ Attendu : le serveur `tabler` apparaît avec ses 12 outils.

---

## 🟦 TÂCHE 2 — Premier contact : les icônes (l'effet « waouh » immédiat)

**Étape 2.1** — Coller ce prompt :

```
Cherche des icônes Tabler pour une app de facturation (factures, paiements, clients)
```

✅ Attendu : Claude appelle `tabler:search_icons` et liste de vrais noms d'icônes (`file-invoice`, `credit-card`, `users`…) avec tags et catégories.

**Étape 2.2** — Enchaîner :

```
Donne-moi file-invoice en composant React, puis en SVG rouge de 32px
```

✅ Attendu : deux appels `tabler:get_icon` → code React (`IconFileInvoice`) + SVG personnalisé.

---

## 🟦 TÂCHE 3 — Les composants UI

**Étape 3.1** :

```
Quels composants Tabler existent pour afficher des données ?
```

✅ Attendu : appel `tabler:list_components` → tables, datagrid, cards…

**Étape 3.2** :

```
Donne-moi le markup exact d'une card Tabler avec un ribbon "New" et une barre de progression
```

✅ Attendu : appels `tabler:get_component` → HTML canonique Tabler 1.4, zéro classe inventée.

---

## 🟦 TÂCHE 4 — La couleur exacte (le test anti-hallucination 😄)

**Étape 4.1** :

```
Quel est le code hex exact de la couleur danger de Tabler ? Et sa variable CSS ?
```

✅ Attendu : appel `tabler:get_colors` → `#d63939` / `--tblr-danger` (extrait du vrai CSS, pas deviné).

---

## 🟦 TÂCHE 5 — Le grand final : une page complète

**Étape 5.1** :

```
Construis-moi une page de login Tabler en mode sombre pour "Acme Cloud" et sauvegarde-la dans login.html
```

✅ Attendu : appel `tabler:get_page_layout` → un fichier HTML complet est créé.

**Étape 5.2** — Double-cliquer sur `login.html`.

✅ Attendu : une page de connexion professionnelle, sombre, parfaitement stylée dans le navigateur.

**Étape 5.3** (bonus) :

```
Maintenant ajoute un dashboard d'accueil avec 4 cartes de stats et un tableau d'utilisateurs
```

✅ Attendu : Claude enchaîne tout seul `search_icons` → `get_component` → `get_page_layout`.

---

## 🟦 TÂCHE 6 — La documentation en direct

**Étape 6.1** :

```
Montre-moi ce que dit la doc officielle Tabler sur la validation de formulaires
```

✅ Attendu : appels `tabler:search_docs` + `tabler:get_docs_page` → contenu réel de docs.tabler.io.

---

## 📸 Partager avec la communauté

Les moments à capturer :

1. **Tâche 2.1** — le bloc d'appel `tabler:search_icons` avec ses résultats (montre le produit en action)
2. **Tâche 5.2** — la page de login rendue dans le navigateur (montre le résultat)
3. Les deux côte à côte = le combo parfait « prompt → outil → résultat »

---

*Created by **Mafady AI Studio** — Supervised by **Dr Maher** · [MIT](../LICENSE)*
