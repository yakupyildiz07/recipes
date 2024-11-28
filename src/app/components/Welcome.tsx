import Footer from "./Footer";
import Header from "./Header";

const Welcome = () => {
  return (
    <div className="home flex flex-col justify-between items-stretch h-screen max-sm:justify-normal ">
    <Header/>
    <div className="container text-end mt-52 max-sm:text-center max-sm:mt-40 ">
      <div className="text-9xl text-slate-700 max-sm:text-7xl">Welcome</div>
      <p className="text-slate-700 text-3xl">
        Are you ready for good recipes?
      </p>
      <p className="text-slate-700 text-3xl">Lets start!</p>
      <a href="/category">
      <button className="bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full mt-3">Click me!</button>
      </a>
    </div>
    <div className="max-sm:hidden"><Footer/></div>
    
  </div>

  );
};
export default Welcome;
