export default function HomeLayout({ rightElement, children, leftElement }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
      {/* left and main */}
      <div className="grid grid-cols-1 lg:grid-cols-12 md:col-span-8 lg:col-span-9 gap-y-2 lg:gap-x-2">
        {/* Left */}
        <div className="col-span-4">
          <div className="lg:sticky lg:top-[10px]">{leftElement}</div>
        </div>
        {/* main */}
        <div className="col-span-8">{children}</div>
      </div>

      {/* Right */}
      <div className="md:col-span-4 lg:col-span-3  ">
        <div className="md:sticky md:top-[10px]">{rightElement}</div>
      </div>
    </div>
  );
}
