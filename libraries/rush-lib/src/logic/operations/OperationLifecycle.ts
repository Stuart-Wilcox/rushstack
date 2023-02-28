// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { AsyncSeriesWaterfallHook } from 'tapable';

import type { ITerminal } from '@rushstack/node-core-library';
import type { IOperationRunnerContext } from './IOperationRunner';
import type { OperationStatus } from './OperationStatus';
import type { IProjectDeps, ShellOperationRunner } from './ShellOperationRunner';
import type { RushConfigurationProject } from '../../api/RushConfigurationProject';
import type { IPhase } from '../../api/CommandLineConfiguration';
import type { ProjectChangeAnalyzer } from '../ProjectChangeAnalyzer';

export interface IOperationRunnerBeforeExecuteContext {
  context: IOperationRunnerContext;
  runner: ShellOperationRunner;
  earlyReturnStatus: OperationStatus | undefined;
  terminal: ITerminal;
  projectDeps: IProjectDeps | undefined;
  lastProjectDeps: IProjectDeps | undefined;
  trackedProjectFiles: string[] | undefined;
  logPath: string;
  errorLogPath: string;
  rushProject: RushConfigurationProject;
  phase: IPhase;
  selectedPhases: Iterable<IPhase>;
  projectChangeAnalyzer: ProjectChangeAnalyzer;
  commandName: string;
  commandToRun: string;
}

export interface IOperationRunnerAfterExecuteContext {
  context: IOperationRunnerContext;
  runner: ShellOperationRunner;
  terminal: ITerminal;
  /**
   * Exit code of the operation command
   */
  exitCode: number;
  status: OperationStatus;
  taskIsSuccessful: boolean;
}

/**
 * Hooks into the lifecycle of the operation runner
 *
 */
export class OperationRunnerLifecycleHooks {
  public beforeExecute: AsyncSeriesWaterfallHook<IOperationRunnerBeforeExecuteContext> =
    new AsyncSeriesWaterfallHook<IOperationRunnerBeforeExecuteContext>(
      ['beforeExecuteContext'],
      'beforeExecute'
    );

  public afterExecute: AsyncSeriesWaterfallHook<IOperationRunnerAfterExecuteContext> =
    new AsyncSeriesWaterfallHook<IOperationRunnerAfterExecuteContext>(
      ['afterExecuteContext'],
      'afterExecute'
    );
}
