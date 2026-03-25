using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ApiFinancial.Models;

public class Categoria
{
    public int id { get; set; }

    [Required(ErrorMessage = "A descrição é obrigatória.")]
    [StringLength(200, ErrorMessage = "A descrição deve ter no máximo 200 caracteres.")]
    public string descricao { get; set; } = string.Empty;

    [Range(1, int.MaxValue, ErrorMessage = "A finalidade é obrigatória.")]
    public int finalidadeid { get; set; }

    [ForeignKey("finalidadeid")]
    public Finalidade? finalidade { get; set; }
    
    [NotMapped]
    public string? icone { get; set; }

    [JsonIgnore]
    public ICollection<Transacao>? Transacoes { get; set; }
}