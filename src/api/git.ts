// git diff HEAD~1 will show things like warnings and changes to .gitignore'd files

// git show HEAD~1 --numstat more machine readable

// git diff HEAD~1 ':!package-lock.json' outputs

/*
diff --git a/package.json b/package.json
index 500e658..ed3b56f 100644
--- a/package.json
+++ b/package.json
@@ -6,13 +6,15 @@
   "homepage": "https://github.com/conradbkay/llm-commit",
   "devDependencies": {
     "prettier": "^3.5.2",
-    "tsx": "^4.19.3"
+    "tsx": "^4.19.3",
+    "vitest": "^3.0.7"
   },
   "scripts": {
     "start": "tsx --env-file=.env src/index.ts"
   },
diff --git a/package.json b/package.json
index 500e658..ed3b56f 100644
--- a/package.json
+++ b/package.json
@@ -6,13 +6,15 @@
   "homepage": "https://github.com/conradbkay/llm-commit",
   "devDependencies": {
     "prettier": "^3.5.2",
-    "tsx": "^4.19.3"
+    "tsx": "^4.19.3",
+    "vitest": "^3.0.7"
   },
   "scripts": {
     "start": "tsx --env-file=.env src/index.ts"
   },
   "dependencies": {
     "@anthropic-ai/sdk": "^0.37.0",
-    "groq-sdk": "^0.15.0"
+    "groq-sdk": "^0.15.0",
+    "repomix": "^0.2.30"
   }
 }
diff --git a/prompting.md b/prompting.md
index de0b3ad..61745aa 100644
*/
