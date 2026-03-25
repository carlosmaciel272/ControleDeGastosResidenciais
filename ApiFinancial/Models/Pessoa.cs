using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ApiFinancial.Models;

public class Pessoa
{
    public int id { get; set; }

    [Required(ErrorMessage = "O nome é obrigatório.")]
    [StringLength(200, ErrorMessage = "O nome deve ter no máximo 200 caracteres.")]
    public string nome { get; set; } = string.Empty;

    [Range(1, int.MaxValue, ErrorMessage = "A idade deve ser um número positivo.")]
    public int idade { get; set; }

    [JsonIgnore]
    public ICollection<Transacao>? Transacoes { get; set; }
}