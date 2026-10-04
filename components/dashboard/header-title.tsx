import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface HeadingPageProps {
  heading: string;
  desc: string;
  BtnComponent?: React.ReactNode;
}
const HeadingPage = ({ heading, desc, BtnComponent }: HeadingPageProps) => {
  return (
    <Card className="mx-auto w-[96%] gap-6">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex flex-col space-y-2">
          <CardTitle>{heading}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </div>
        <div>{BtnComponent}</div>
      </CardHeader>
    </Card>
  );
};

export default HeadingPage;
