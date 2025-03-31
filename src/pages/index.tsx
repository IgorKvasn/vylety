'use client'

import styles from "./page.module.css";
import axios from 'axios';
import {useLayoutEffect, useRef, useState} from "react";
import {VyletDTO} from "@/types/vylet-dto";
import Link from "next/link";
import RootLayout from "@/app/components/layout";

export default function Home() {
    let [vylety, setVylety] = useState([] as VyletDTO[]);
    let [vyletyLoading, setVyletyLoading] = useState(false);

    useLayoutEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setVyletyLoading(true);
        try {
            let data = await axios.get(`api/vylety`);
            setVylety(data.data);
        } catch (error) {
            alert(error);
        } finally {
            setVyletyLoading(false);
        }

    }


    return (
        <RootLayout>
            <div>
                <Link className={`button is-primary`}
                      href={{
                          pathname: '/edit',
                      }}>
                    Pridaj
                </Link>
            </div>
            <div>
                {vyletyLoading ?
                    <div>Loading....</div>
                    : <VyletyList list={vylety}></VyletyList>
                }
            </div>
        </RootLayout>
    );
}

function VyletyList({list}: { list: VyletDTO[] }) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', rowGap: '1em'}}>
            {list.map(v =>
                <div key={v.id}>
                    <Link
                        href={{
                            pathname: `/edit/${v.id}`,
                        }}>
                        Uprav
                    </Link>
                    <div style={{fontWeight: 'bold', fontSize: '1.5em'}}>{v.name}</div>
                    <div style={{fontStyle: 'italic'}}>{v.description}</div>
                </div>
            )}
        </div>
    );
}

