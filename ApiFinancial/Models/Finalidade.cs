using System.Text.Json.Serialization;

namespace ApiFinancial.Models;

public class Finalidade
{
    public int id { get; set; }

    public string nome { get; set; } = string.Empty;

    [JsonIgnore]
    public ICollection<Categoria>? Categorias { get; set; }

    [JsonIgnore]
    public ICollection<Transacao>? Transacoes { get; set; }
}