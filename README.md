# Fashion AI Advisor (Vercel serverless)

This project contains a single serverless API endpoint for Vercel that calls OpenAI to generate fashion outfit suggestions.

## Files
- `api/fashion-advice.js` : the serverless function
- `package.json`
- `vercel.json`
- `README.md`

## Deploy to Vercel (step-by-step)

1. Create a GitHub repo:
   - On GitHub, create a new repository (e.g. `fashion-ai-advisor`).
   - Upload the project files (you can drag & drop the files or push from git).

2. Import to Vercel:
   - Go to https://vercel.com/ and sign in with GitHub.
   - Click "New Project" → Import from GitHub → select your repo.
   - During setup add an Environment Variable:
     - Key: `OPENAI_API_KEY`
     - Value: *your OpenAI secret key* (do NOT commit this to GitHub)
   - Finish the import and click "Deploy".

3. Get the endpoint URL:
   - After deployment you will get a URL like `https://yourproject.vercel.app`.
   - The API endpoint is: `POST https://yourproject.vercel.app/api/fashion-advice`

4. Test with curl:
   ```bash
   curl -X POST https://yourproject.vercel.app/api/fashion-advice \
     -H "Content-Type: application/json" \
     -d '{"occasion":"wedding","mood":"joyful","style":"traditional"}'
   ```

5. Connect to Glide:
   - In Glide, create a form with fields: `occasion`, `mood`, `style`.
   - Use a "Custom Action" or the Integrations > Custom API feature to call the Vercel endpoint (POST).
   - Map the form values into the JSON body:
     ```json
     { "occasion": "{occasion}", "mood": "{mood}", "style": "{style}" }
     ```
   - Map the API response field `advice` into a column in your Glide sheet so you can display it (as chat text or cards).

## Notes & troubleshooting
- If you see `OPENAI_API_KEY not configured`, re-open Project Settings → Environment Variables in Vercel and add your key (then redeploy).
- Keep your OpenAI key secret. Do not paste it into public chat or commit it in code.
- Costs: OpenAI API calls are billable to your OpenAI account — monitor usage in your OpenAI dashboard.
- If you want images or richer structure, we can extend the prompt to return JSON and adapt the endpoint to parse it.
