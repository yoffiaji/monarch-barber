"use client";

interface BookingPlaceholderProps {
  location: string;
}

export default function BookingPlaceholder({ location }: BookingPlaceholderProps) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[450px] h-[450px] border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center gap-4 text-center px-6">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-widest text-gray-700 uppercase">
            Booking System
          </p>
          <p className="text-xs text-gray-500 mt-1">{location}</p>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed max-w-[280px]">
          Booking integration will be connected here. Contact us directly to
          schedule your appointment.
        </p>
        <a
          href="mailto:bln@nomadbarber.com"
          className="inline-block px-6 py-3 text-xs tracking-widest font-semibold bg-black text-white border border-black hover:bg-white hover:text-black transition-all duration-200"
        >
          CONTACT US
        </a>
      </div>
    </div>
  );
}