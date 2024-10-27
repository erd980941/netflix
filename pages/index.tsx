import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavoriMovie from "@/hooks/useFavorites";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import InfoModal from "@/components/infoModal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}

export default function Home() {
  const { data: user } = useCurrentUser();
  const { data: movies } = useMovieList();
  const { data: favoriteMovie } = useFavoriMovie();
  const { isOpen, closeModal } = useInfoModalStore();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} ></InfoModal>
      <Navbar></Navbar>
      <Billboard></Billboard>
      <div className="lg:mt-52 mt-4" >
        <MovieList title="Trending" data={movies} ></MovieList>
        <MovieList title="Favori List" data={favoriteMovie} ></MovieList>
      </div>
      <div className="h-96"></div>
      {/* <button onClick={()=>signOut()} className="w-full text-white text-xl" >Logout</button> */}
    </>
  );
}
