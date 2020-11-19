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

	resolveTask(task: vscode.Task): vscode.Task | undefined {
		const problemMatchers = task.problemMatchers as any;
		vscode.window.showInformationMessage('problemMatchers: ' + (
			problemMatchers === undefined ? 'undefined'
			: Array.isArray(problemMatchers) ? '[' + problemMatchers.join(', ') + ']'
			: problemMatchers.toString()
		));
		return undefined;
	}
}
