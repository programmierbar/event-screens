/**
 * Adapted from:
 * Source: https://github.com/antfu/talks/blob/d8cf2aed54db9744470a9634a33deaa40cd6670b/scripts/picker.ts
 * License: AGPL-3.0
 */

import fs from 'node:fs/promises'
import { execa } from 'execa'
import prompts from 'prompts'

async function startPicker() {
    const files = await Promise.all((await fs.readdir(new URL('./../slides', import.meta.url), { withFileTypes: true }))
        .map(dirent => dirent.name)
    .filter(folder => folder.match(/md$/))
        .sort((a, b) => -a.localeCompare(b))
        .map(async (file) => {
            return {
                title: file,
                value: file,
            } as const
        }))

    const result = await prompts([
        {
            type: 'select',
            name: 'file',
            message: 'Pick a slide',
            choices: files,
        },
    ])

    if (result.file) {
        await execa('npm', ['exec', 'slidev', '--', '--open', 'slides/' + result.file], {
            stdio: 'inherit',
        })
    }
}

await startPicker()
