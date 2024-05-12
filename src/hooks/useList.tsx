"use client";
import { collection, onSnapshot } from "@firebase/firestore";
import { db } from "@/firebase/init";
import { Movie } from "@/utils/typings";
import { DocumentData } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function useList(uid: string | undefined) {
  const [list, setList] = useState<Movie[] | DocumentData[]>([]);

  useEffect(() => {
    if (!uid) return;

    return onSnapshot(
      collection(db, "customers", uid, "myList"),
      (snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
      },
    );
  }, [uid]);
  return list;
}
