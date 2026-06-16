# PlaywriteWithJavascript
playwright automation with javascript

# Playwright MCP server integration with Copilot agent
1. run below commond

code --add-mcp "{\`"name\`":\`"playwright\`",\`"command\`":\`"npx\`",\`"args\`":[\`"@playwright/mcp@latest\`"]}"

result: Added MCP servers: playwright
Now that the server is registered, your AI agent has the ability to see and control a browser window. Here is how to actually put it to work.


2.verify and start
VS Code saves MCP configurations in a dedicated, separate file called mcp.json : search this file -> MCP: Open User Configuration

Result:
{
	"servers": {
		"playwright": {
			"command": "npx",
			"args": [
				"@playwright/mcp@latest"
			],
			"env": {// this is because we are working in Renault proxy so
       	 			"HTTP_PROXY": "http://z046461:Chethu427442@10.244.3.249:3128",
        			"HTTPS_PROXY": "http://z046461:Chethu427442@10.244.3.249:3128"
      			}
		}
	},
	"inputs": []
}


3. give commond to co-pilot agent code
"Use the Playwright tool to go to https://demo.playwright.dev/todomvc. Add three tasks: 'Buy milk', 'Run 5k', and 'Fix MCP Server'. Mark the second task as completed. Then, generate a clean Playwright .spec.ts test file that automates this entire flow."

4.Create agents and skills - do some research

