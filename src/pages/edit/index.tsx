'use client'

import axios from 'axios';
import {useLayoutEffect, useState} from "react";
import {VyletDTO} from "@/types/vylet-dto";
import {useRouter} from "next/router";
import Link from "next/link";
import RootLayout from "@/app/components/layout";
export default function Edit() {
    const router = useRouter();
    const [currentVylet, setCurrentVylet] = useState<VyletDTO | null>(null);
    const [isNewVylet, setIsNewVylet] = useState<boolean>(false);

    useLayoutEffect(() => {
        const vyletId = router.query.id;
        if (!!vyletId) {
            axios.get(`/api/vylety/${vyletId}`).then((res) => {
                setCurrentVylet(res.data);
                setIsNewVylet(false);
            });
        } else {
            setCurrentVylet({} as VyletDTO);
            setIsNewVylet(true);
        }
    }, []);

    function onAddVylet() {
        axios.post(`/api/vylety`, currentVylet).then((res) => {
            router.push('/');
        })
    }

    function updateCurrentVylet(prop: string, value: any) {
        debugger;
        // @ts-ignore
        currentVylet!![prop] = value;
        setCurrentVylet(JSON.parse(JSON.stringify(currentVylet)));
    }

    return (
        <RootLayout>
            {!!currentVylet ?
                <div>
                    <div className="field">
                        <label htmlFor="vyletName" className="label">Názov</label>
                        <div className="control">
                            <input type="text" className="input" id="vyletName" value={currentVylet!.name}
                                   onChange={(e) => {
                                       updateCurrentVylet('name', e.target.value);
                                   }}/>
                        </div>
                    </div>


                    <div className="field">
                        <label htmlFor="vyletDesc" className="label">Popis</label>
                        <textarea className="textarea" id="vyletDesc" rows={3}
                                  value={currentVylet!.description}
                                  onChange={(e) => {
                                      updateCurrentVylet('description', e.target.value);
                                  }}
                        ></textarea>
                    </div>

                    <button className={'button is-primary'} onClick={onAddVylet}>
                        {isNewVylet?'Pridaj':'Uprav'}
                    </button>
                    <Link href={'/'}>
                        Zrušiť
                    </Link>
                </div> :
                <div>Loading...</div>
            }
        </RootLayout>
    );
}

