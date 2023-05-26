import React from "react";
import {Editor} from "@/app/editor/[slug]/Editor";
import { SWRConfig } from 'swr';
import fs from 'fs/promises';
import path from 'path';


type EditorPageProps = {
    params: {
        slug: string;
    }
}

export default async function EditorPage({ params }: EditorPageProps) {
    console.debug("RENDER ON SERVER");

    const fallback: { [key: string]: string } = {};
    const content = await fs.readFile(path.join('./public', params.slug), 'utf-8');
    fallback[`/${params.slug}.md`] = content;

    return (
        <SWRConfig value={{ fallback }}>
            <Editor slug={params.slug}></Editor>
        </SWRConfig>
    );
}
