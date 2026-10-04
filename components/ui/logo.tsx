import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
        <Image src="/logo.png" alt="ChatAstro" width={32} height={32} />
      </div>
      <span className="text-xl font-bold text-primary">ChatAstro</span>
    </div>
  );
};

export default Logo;
