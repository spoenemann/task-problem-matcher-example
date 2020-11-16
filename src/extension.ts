import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const taskProvider = vscode.tasks.registerTaskProvider('mytask', new MyTaskProvider());
	context.subscriptions.push(taskProvider);
}

export function deactivate() {
}

export class MyTaskProvider implements vscode.TaskProvider {
	provideTasks() {
		return [
			new vscode.Task(
				{ type: 'mytask' },
				vscode.TaskScope.Workspace,
				'Print a warning',
				'mytask',
				new vscode.ShellExecution('echo "warning README.md:3: This is a message"'),
				'$mymatcher'
			)
		];
	}

	resolveTask(_: vscode.Task): vscode.Task | undefined {
		return undefined;
	}
}
