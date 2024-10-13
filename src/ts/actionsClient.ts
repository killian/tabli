/*
 * client that provides implementations of functions from actions.ts
 * that send messages to the service worker to perform the actions
 */
import { TabItem, TabWindow } from './tabWindow'; // eslint-disable-line
import {
    StateRef,
    utils as oneRefUtils,
    update,
    awaitableUpdate_,
    mutableGet,
    awaitableUpdate,
} from 'oneref';
import TabManagerState from './tabManagerState';
import { log } from './globals';
import { WorkerConnection } from './workerConnection';

type WindowId = number;
type TMSRef = StateRef<TabManagerState>;

let conn: WorkerConnection;

export function initClient(wc: WorkerConnection) {
    log.debug('actionsClient: init');
    conn = wc;
}

export async function openWindow(targetTabWindow: TabWindow, storeRef: TMSRef) {
    const { open, openWindowId, savedFolderId } = targetTabWindow;
    const args = { open, openWindowId, savedFolderId };
    log.debug('actionsClient: openWindow: ', args);
    conn.send({ action: 'openWindow', args });
}

export async function closeWindow(
    targetTabWindow: TabWindow,
    storeRef: TMSRef,
) {
    const { open, openWindowId, savedFolderId } = targetTabWindow;
    const args = { open, openWindowId, savedFolderId };
    log.debug('actionsClient: closeWindow: ', args);
    conn.send({ action: 'closeWindow', args });
}

export async function expandWindow(
    targetTabWindow: TabWindow,
    expand: boolean,
    storeRef: TMSRef,
) {
    const { open, openWindowId, savedFolderId } = targetTabWindow;
    const args = { open, openWindowId, savedFolderId, expand };
    log.debug('actionsClient: expandWindow: ', args);
    conn.send({ action: 'expandWindow', args });
}

export async function revertWindow(
    targetTabWindow: TabWindow,
    storeRef: TMSRef,
) {
    const { open, openWindowId, savedFolderId } = targetTabWindow;
    const args = { open, openWindowId, savedFolderId };
    log.debug('actionsClient: revertWindow: ', args);
    conn.send({ action: 'revertWindow', args });
}

export async function unmanageWindow(
    targetTabWindow: TabWindow,
    storeRef: TMSRef,
) {
    const { open, openWindowId, savedFolderId } = targetTabWindow;
    const args = { open, openWindowId, savedFolderId };
    log.debug('actionsClient: unmanageWindow: ', args);
    conn.send({ action: 'unmanageWindow', args });
}

export async function manageWindow(
    targetTabWindow: TabWindow,
    title: string,
    storeRef: TMSRef,
) {
    const { open, openWindowId, savedFolderId } = targetTabWindow;
    const args = { open, openWindowId, savedFolderId, title };
    log.debug('actionsClient: manageWindow: ', args);
    conn.send({ action: 'manageWindow', args });
}

export async function activateOrRestoreTab(
    targetTabWindow: TabWindow,
    tab: TabItem,
    tabIndex: number,
    storeRef: TMSRef,
) {
    const { open, openWindowId, savedFolderId } = targetTabWindow;
    const tabKey = tab.key;
    const args = { open, openWindowId, savedFolderId, tabKey, tabIndex };
    log.debug('actionsClient: activateOrRestoreTab: ', args);
    conn.send({ action: 'activateOrRestoreTab', args });
}
