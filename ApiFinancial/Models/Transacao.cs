using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiFinancial.Models;

public class Transacao
{
    public Guid id { get; set; }

    [Required(ErrorMessage = "A descrição é obrigatória.")]
    [StringLength(400, ErrorMessage = "A descrição deve ter no máximo 400 caracteres.")]
    public string descricao { get; set; } = string.Empty;

    [Range(typeof(decimal), "0.01", "9999999999")]
    public decimal Valor { get; set; }
    
    [Range(1, int.MaxValue, ErrorMessage = "A finalidade é obrigatória.")]
    public int finalidadeid { get; set; }

    [ForeignKey("finalidadeid")]
    public Finalidade? finalidade { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "A categoria é obrigatória.")]
    public int categoriaid { get; set; }

    [ForeignKey("categoriaid")]
    public Categoria? categoria { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "A pessoa é obrigatória.")]
    public int pessoaid { get; set; }

    [ForeignKey("pessoaid")]
    public Pessoa? pessoa { get; set; }
}
