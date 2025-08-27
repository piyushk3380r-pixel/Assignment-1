export default function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <dl className="row">
        <dt className="col-sm-3">Name</dt>
        <dd className="col-sm-9">Piyush</dd>

        <dt className="col-sm-3">Student Number</dt>
        <dd className="col-sm-9">21912969</dd>

        <dt className="col-sm-3">Video</dt>
        <dd className="col-sm-9">
          {/* Replace with your own URL later once the project is complete and the video is uploaded on youtube */}
          <div className="ratio ratio-16x9">
            <iframe
              title="About / Demo Video"
              src="https://www.youtube.com/embed/cw9RXj4czKs?si=Uz-BITAy14WQInOa"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </dd>
      </dl>
    </>
  );
}
