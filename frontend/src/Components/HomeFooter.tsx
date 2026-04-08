

function HomeFooter(){

    return(

        <>
        
      <div className="bg-stone-800 py-8 md:py-10 px-6 md:px-10 grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-6 md:gap-x-16">
        {[
          { num: "₱1,500",   label: "Per Month" },
          { num: "7 Days",   label: "Free Trial" },
          { num: "AI-First", label: "Sales Insights" },
          { num: "Zero",     label: "Tech Skills Needed" },
        ].map(({ num, label }) => (
          <div key={label} className="text-center">
            <span className="[font-family:'Playfair_Display',serif] block text-2xl md:text-3xl font-bold text-amber-400 leading-none mb-1">
              {num}
            </span>
            <span className="text-xs uppercase tracking-widest text-stone-400">{label}</span>
          </div>
        ))}
      </div>
        </>
    )
}

export default HomeFooter;