import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import { jsPDF } from "jspdf";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";

export const PdfButton = ({ pokemonList, fileName }) => {
  const [loading, setLoading] = useState(false);
  const loadImage = (pokemon) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = pokemon.sprites.other["official-artwork"].front_default;
    });

  const handleExportToPDF = () => {
    const totalPokemon = pokemonList.length;
    if (totalPokemon > 0) {
      //Max size for images
      setLoading(true);
      const maxHeight = 105,
        maxWidth = 80;
      const doc = new jsPDF("p", "mm", "a4");
      let pokemonInPage = 1;
      //Prepare images
      Promise.all(pokemonList.map(loadImage))
        .then((images) => {
          images.forEach((image, i) => {
            const pokemon = pokemonList[i];
            let col = 20;
            let row = 20;

            if (pokemonInPage % 2 === 0) {
              row = 160;
            }

            doc.setFont("helvetica", "bold");
            doc.setFontSize(22);
            doc.text(`#${pokemon.id}. ${pokemon.name}`, col, row);

            let height = image.height,
              width = image.width;

            const ratio = height / width;

            if (height > maxHeight || width > maxWidth) {
              if (height > width) {
                height = maxHeight;
                width = height * (1 / ratio);
              } else if (width > height) {
                width = maxWidth;
                height = width * ratio;
              } else if (width === height) {
                width = maxHeight;
                height = maxHeight;
              }
            }
            doc.addImage(
              image.src,
              image.src.split(".").at(-1),
              col,
              row,
              width,
              height
            );

            row += maxHeight + 5;
            doc.setFontSize(16);
            doc.setFont("helvetica", "bold");
            doc.text("Base experience: ", col, row);
            doc.setFont("helvetica", "normal");
            col += 48;
            doc.text(pokemon.base_experience.toString(), col, row);

            col += 32;
            doc.setFont("helvetica", "bold");
            doc.text("Height: ", col, row);
            doc.setFont("helvetica", "normal");
            col += 21;
            doc.text(`${(pokemon.height / 10).toString()} mt`, col, row);

            col += 24;
            doc.setFont("helvetica", "bold");
            doc.text("Weight: ", col, row);
            doc.setFont("helvetica", "normal");
            col += 22;
            doc.text(`${(pokemon.weight / 10).toString()} kg`, col, row);

            row -= maxHeight + 10;
            col = 130;
            doc.setFont("helvetica", "bold");
            doc.text("Stats: ", col, row);
            doc.setFont("helvetica", "normal");
            row += 7;
            pokemon.stats.forEach((s) => {
              doc.text(`${s.stat.name}: ${s.base_stat}`, col, row);
              row += 6;
            });
            row += 10;
            doc.setFont("helvetica", "bold");
            doc.text("Types: ", col, row);
            doc.setFont("helvetica", "normal");
            row += 7;
            pokemon.types.forEach((t) => {
              doc.text(t.type.name, col, row);
              row += 6;
            });

            row += 10;
            doc.setFont("helvetica", "bold");
            doc.text("Abilities: ", col, row);
            doc.setFont("helvetica", "normal");
            row += 7;
            pokemon.abilities.forEach((a) => {
              doc.text(a.ability.name, col, row);
              row += 6;
            });

            if (pokemonInPage % 2 === 0 && i < totalPokemon - 1) {
              doc.addPage("a4", "p");
            }

            pokemonInPage++;
          });
          if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            )
          ) {
            const blob = doc.output();
            window.open(URL.createObjectURL(blob));
          } else {
            doc.save(`${fileName}.pdf`);
          }

          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };
  return (
    <>
      {loading && <LoadingScreen />}
      <ReactTooltip className="tooltip" effect="solid" />
      <button
        data-tip="Export to PDF"
        type="button"
        className="btn btn--pdf"
        onClick={handleExportToPDF}
      >
        PDF
      </button>
    </>
  );
};
