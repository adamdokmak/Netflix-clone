"use client";
import useAuth from "@/hooks/useAuth";
import { useRecoilState } from "recoil";
import { modalState } from "@/atoms/modalAtom";
import useList from "@/hooks/useList";
import Row from "@/components/Row";
import Modal from "@/components/Modal";

export default function MyListPage() {
  const showModal = useRecoilState(modalState);
  const { user } = useAuth();
  const list = useList(user?.uid);

  return (
    <section className="relative space-y-5 pb-24 pl-4 pt-[20%] md:space-y-12 md:pt-[15%] lg:space-y-24 lg:pl-10 lg:pt-[10%]">
      <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">My List</h1>
      {list.length > 0 ? (
        <Row title="My List" movies={list} />
      ) : (
        <h2>Your list will fill up as you add movies & tv shows!</h2>
      )}
      {showModal && <Modal />}
    </section>
  );
}
