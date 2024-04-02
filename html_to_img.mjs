
      import html2canvas from 'html2canvas'

      document.getElementById("download_button").onclick = function() {
        console.log("clicked")
      }
        const screenshotDiv = document.getElementById("track-listing")
        
        html2canvas(screenshotDiv).then((canvas) => {
          const b64image = canvas.toDataURL("image/png")
          var a = document.createElement('a')
          a.setAttribute('href', b64image);
          a.setAttribute('download', 'song-list.png')
          a.click();
          a.remove()
        })